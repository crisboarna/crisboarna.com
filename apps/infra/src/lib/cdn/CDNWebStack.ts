import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDNWebStackProps } from '../../interfaces';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';
import { wafRules } from './util';
import {
  AllowedMethods,
  Distribution,
  HttpVersion,
  LambdaEdgeEventType,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { SSMUtil } from 'aws-cdk-lib-util';
import { ENV, PARAM_LAMBDA_API_AUTH_CDN_VERSION_ARN } from '../../config';
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
} from 'aws-cdk-lib/aws-s3';
import {
  Effect,
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import {
  BucketDeployment,
  Source,
  StorageClass,
} from 'aws-cdk-lib/aws-s3-deployment';
import {
  Architecture,
  Code,
  IVersion,
  Runtime,
  Version,
} from 'aws-cdk-lib/aws-lambda';
import { EdgeFunction } from 'aws-cdk-lib/aws-cloudfront/lib/experimental';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

/**
 * Stack creating the Cloudfront Distribution, WAF, R53 mapping that fronts API GW
 */
export class CDNWebStack extends Stack {
  constructor(scope: Construct, id: string, props?: CDNWebStackProps) {
    super(scope, id, props);

    const {
      artifactPathWeb,
      cdnParamNameWeb,
      domainCertParamName,
      domainName,
      projectName,
      stackEnv,
    } = props;

    const subdomainFragmentWeb =
      stackEnv === ENV.PROD ? `` : `web.${stackEnv.toLowerCase()}.`;

    const [domainCertArn] = [domainCertParamName].map(
      (paramName) => <string>SSMUtil.getSSMParameter({
          scope: this,
          projectName,
          stackEnv,
          paramName,
        })
    );

    const certificate = Certificate.fromCertificateArn(
      this,
      `${projectName}-CDN-Web-ACM-Cert-Import-${stackEnv}`,
      domainCertArn
    );

    const wafv2 = new CfnWebACL(this, `${projectName}-WAF-${stackEnv}`, {
      name: `${projectName}-WAF-Web-${stackEnv}`,
      description: `WAF for ${projectName} Web ${stackEnv}`,
      scope: 'CLOUDFRONT',
      defaultAction: {
        allow: {},
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: `${projectName.toLowerCase()}-waf-access-web-${stackEnv.toLowerCase()}`,
        sampledRequestsEnabled: true,
      },
      rules: wafRules(projectName, stackEnv, 'web'),
    });

    let lambdaAuthCdn: IVersion | undefined;

    if (stackEnv !== ENV.PROD) {
      const lambdaAuthCdnArn = <string>SSMUtil.getSSMParameter({
        scope: this,
        projectName,
        stackEnv,
        paramName: PARAM_LAMBDA_API_AUTH_CDN_VERSION_ARN,
        extract: true,
      });
      lambdaAuthCdn = Version.fromVersionArn(
        this,
        `${projectName}-CDN-Lambda-Edge-${stackEnv}`,
        lambdaAuthCdnArn
      );
      // lambdaAuthCdn = new EdgeFunction(
      //     this,
      //     `${projectName}-CDN-Auth-${stackEnv}`,
      //     {
      //         functionName: `${projectName}-CF-Edge-Auth-${stackEnv}`,
      //         code: Code.fromAsset(artifactPathWeb),
      //         runtime: Runtime.NODEJS_16_X,
      //         handler: 'main.handler',
      //         retryAttempts: 0,
      //         memorySize: 128,
      //         logRetention: RetentionDays.ONE_DAY,
      //         architecture: Architecture.X86_64,
      //         currentVersionOptions: { removalPolicy: RemovalPolicy.DESTROY },
      //         role: new Role(this, `${projectName}-CDN-Auth-Role-${stackEnv}`, {
      //             roleName: `${projectName}-CDN-Auth-Role-${stackEnv}`,
      //             description: `Role used for CDN Viewer Request Auth Lambda ${stackEnv}`,
      //             assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      //             managedPolicies: [
      //                 ManagedPolicy.fromAwsManagedPolicyName(
      //                     'service-role/AWSLambdaBasicExecutionRole'
      //                 ),
      //             ],
      //         }),
      //     }
      // );
    }

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      `${projectName}-CDN-Web-OAI-${stackEnv}`,
      {
        comment: 'OAI used by CDN for main website S3 bucket',
      }
    );

    const bucket = new Bucket(this, `${projectName}-S3-Bucket-${stackEnv}`, {
      bucketName: `${subdomainFragmentWeb}${domainName}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy:
        stackEnv !== ENV.PROD ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
      autoDeleteObjects: stackEnv !== ENV.PROD,
      encryption: BucketEncryption.S3_MANAGED,
      serverAccessLogsPrefix: 'logs/bucket',
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:ListBucket'],
        resources: [bucket.bucketArn],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );
    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );
    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.DENY,
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/logs/*`],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );

    const cdnDistribution = new Distribution(
      this,
      `${projectName}-CDN-Web-${stackEnv}`,
      {
        comment: `${projectName}WEB${stackEnv}`,
        webAclId: wafv2.attrArn,
        enabled: true,
        httpVersion: HttpVersion.HTTP2,
        certificate,
        domainNames: [`${subdomainFragmentWeb}${domainName}`],
        defaultRootObject: 'index.html',
        enableLogging: true,
        logBucket: bucket,
        logFilePrefix: 'logs/cdn',
        minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
        defaultBehavior: {
          origin: new S3Origin(bucket, { originAccessIdentity }),
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          compress: true,
          originRequestPolicy: {
            //CORS-S3Origin
            originRequestPolicyId: '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf',
          },
          edgeLambdas:
            stackEnv !== ENV.PROD
              ? [
                  {
                    functionVersion: lambdaAuthCdn,
                    eventType: LambdaEdgeEventType.VIEWER_REQUEST,
                    includeBody: false,
                  },
                ]
              : undefined,
        },
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: Duration.minutes(30),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
            ttl: Duration.minutes(30),
          },
        ],
      }
    );

    const zone = HostedZone.fromLookup(
      this,
      `${projectName}-CDN-Web-R53-Zone-${stackEnv}`,
      {
        domainName,
      }
    );

    new ARecord(this, `${projectName}-R53-A-Web-${stackEnv}`, {
      zone,
      recordName: subdomainFragmentWeb.substring(
        0,
        subdomainFragmentWeb.lastIndexOf('.')
      ),
      target: RecordTarget.fromAlias(new CloudFrontTarget(cdnDistribution)),
    });

    new BucketDeployment(this, `${projectName}-S3-Deployment-Web-${stackEnv}`, {
      sources: [Source.asset(artifactPathWeb)],
      destinationBucket: bucket,
      distribution: cdnDistribution,
      memoryLimit: 256,
      storageClass: StorageClass.STANDARD_IA,
    });

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: cdnParamNameWeb,
      value: cdnDistribution.distributionId,
    });
  }
}
