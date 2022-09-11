import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ACMStackProps } from '../../interfaces';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';
import { SSMUtil } from 'aws-cdk-lib-util';
import { ENV } from '../../config';

/**
 * Stack creating the ACM certificates for Cloudfront/API Gateway
 */
export class ACMStack extends Stack {
  constructor(scope: Construct, id: string, props?: ACMStackProps) {
    super(scope, id, props);

    const {
      domainCertParamName,
      domainName,
      domainZoneId,
      projectName,
      stackEnv,
    } = props;

    let domainTarget;
    if (stackEnv !== ENV.PROD) {
      domainTarget = `${stackEnv.toLowerCase()}.${domainName}`;
    } else {
      domainTarget = domainName;
    }

    const zone = HostedZone.fromHostedZoneId(
      this,
      `${projectName}-ACM-Zone-Import-${stackEnv}`,
      domainZoneId
    );

    const certificate = new Certificate(
      this,
      `${projectName}-ACM-Cert-${stackEnv}`,
      {
        domainName: domainTarget,
        subjectAlternativeNames: [`*.${domainTarget}`],
        validation: CertificateValidation.fromDns(zone),
      }
    );

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: domainCertParamName,
      value: certificate.certificateArn,
    });
  }
}
