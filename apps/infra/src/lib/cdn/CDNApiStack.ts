import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDNApiStackProps } from '../../interfaces';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';
import { wafRules } from './util';
import {
  AllowedMethods,
  Distribution,
  HttpVersion,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { CDKCustomResourceUtil, SSMUtil } from 'aws-cdk-lib-util';
import { ENV, PARAM_LAMBDA_API_AUTH_CDN_VERSION_ARN } from '../../config';
import { IVersion, Version } from 'aws-cdk-lib/aws-lambda';

/**
 * Stack creating the Cloudfront Distribution, WAF, R53 mapping that fronts API GW
 */
export class CDNApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: CDNApiStackProps) {
    super(scope, id, props);

    const {
      apiAuthHeaderKey,
      apiAuthHeaderValue,
      apiIdParamName,
      apiRegion,
      cdnParamNameApi,
      env,
      domainCertParamName,
      domainName,
      projectName,
      stackEnv,
    } = props;

    const subdomainFragmentApi =
      stackEnv === ENV.PROD ? `api` : `api.${stackEnv.toLowerCase()}`;

    const [domainCertArn] = [domainCertParamName].map(
      (paramName) => <string>SSMUtil.getSSMParameter({
          scope: this,
          projectName,
          stackEnv,
          paramName,
        })
    );

    const apiGatewayId = CDKCustomResourceUtil.getSSMParamViaCustomResource({
      scope: this,
      account: { ...env, region: apiRegion },
      projectName,
      paramName: apiIdParamName,
      functionName: `CDN-SSM-Get`,
      stackEnv,
    });

    const certificate = Certificate.fromCertificateArn(
      this,
      `${projectName}-CDN-Api-ACM-Cert-Import-${stackEnv}`,
      domainCertArn
    );

    // const wafv2 = new CfnWebACL(this, `${projectName}-WAF-${stackEnv}`, {
    //   name: `${projectName}-WAF-Api-${stackEnv}`,
    //   description: `WAF for ${projectName} API ${stackEnv}`,
    //   scope: 'CLOUDFRONT',
    //   defaultAction: {
    //     allow: {},
    //   },
    //   visibilityConfig: {
    //     cloudWatchMetricsEnabled: true,
    //     metricName: `${projectName.toLowerCase()}-waf-access-api-${stackEnv.toLowerCase()}`,
    //     sampledRequestsEnabled: true,
    //   },
    //   rules: wafRules(projectName, stackEnv, 'api'),
    // });

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
    }

    const cdnDistribution = new Distribution(
      this,
      `${projectName}-CDN-API-${stackEnv}`,
      {
        comment: `${projectName}API${stackEnv}`,
        // webAclId: wafv2.attrArn,
        enabled: true,
        httpVersion: HttpVersion.HTTP2,
        certificate,
        domainNames: [`${subdomainFragmentApi}.${domainName}`],
        defaultBehavior: {
          origin: new HttpOrigin(
            `${apiGatewayId}.execute-api.${apiRegion}.amazonaws.com`,
            {
              originPath: '/prod',
              customHeaders: { [apiAuthHeaderKey]: apiAuthHeaderValue },
            }
          ),
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );

    const zone = HostedZone.fromLookup(
      this,
      `${projectName}-CDN-Api-R53-Zone-${stackEnv}`,
      {
        domainName,
      }
    );

    new ARecord(this, `${projectName}-R53-A-API-${stackEnv}`, {
      zone,
      recordName: subdomainFragmentApi,
      target: RecordTarget.fromAlias(new CloudFrontTarget(cdnDistribution)),
    });

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: cdnParamNameApi,
      value: cdnDistribution.distributionId,
    });
  }
}
