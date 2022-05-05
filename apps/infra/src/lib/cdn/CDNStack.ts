import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDNStackProps } from '../../interfaces';
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

/**
 * Stack creating the Cloudfront Distribution, WAF, R53 mapping that fronts API GW
 */
export class CDNStack extends Stack {
  constructor(scope: Construct, id: string, props?: CDNStackProps) {
    super(scope, id, props);

    const {
      apiIdParamName,
      apiRegion,
      cdnParamName,
      env,
      domainCertParamName,
      domainName,
      projectName,
      stackEnv,
    } = props;

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
      `${projectName}-CDN-ACM-Cert-Import-${stackEnv}`,
      domainCertArn
    );

    const wafv2 = new CfnWebACL(this, `${projectName}-WAF-${stackEnv}`, {
      name: `${projectName}-WAF-${stackEnv}`,
      description: `WAF for ${projectName} API`,
      scope: 'CLOUDFRONT',
      defaultAction: {
        allow: {},
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: `${projectName.toLowerCase()}-waf-access-${stackEnv.toLowerCase()}`,
        sampledRequestsEnabled: true,
      },
      rules: wafRules(projectName, stackEnv),
    });

    const cdnDistribution = new Distribution(
      this,
      `${projectName}-CDN-${stackEnv}`,
      {
        comment: `${projectName}${stackEnv}`,
        webAclId: wafv2.attrArn,
        enabled: true,
        httpVersion: HttpVersion.HTTP2,
        certificate,
        domainNames: [`api.${domainName}`],
        defaultBehavior: {
          origin: new HttpOrigin(
            `${apiGatewayId}.execute-api.${apiRegion}.amazonaws.com`,
            { originPath: '/prod' }
          ),
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );

    const zone = HostedZone.fromLookup(
      this,
      `${projectName}-R53-Zone-${stackEnv}`,
      {
        domainName,
      }
    );

    new ARecord(this, `${projectName}-R53-A-${stackEnv}`, {
      zone,
      recordName: 'api',
      target: RecordTarget.fromAlias(new CloudFrontTarget(cdnDistribution)),
    });

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: cdnParamName,
      value: cdnDistribution.distributionId,
    });
  }
}
