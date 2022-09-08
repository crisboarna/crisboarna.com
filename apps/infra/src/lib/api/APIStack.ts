import { Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { APIStackProps } from '../../interfaces';
import {
  CfnApi,
  CfnApiMapping,
  CfnDomainName,
  CfnIntegration,
  CfnRoute,
  CfnStage,
} from 'aws-cdk-lib/aws-apigatewayv2';
import {
  ENV,
  PARAM_ACM_DOMAIN_ARN,
  PARAM_API_GW_ID,
  PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
} from '../../config';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGatewayv2DomainProperties } from 'aws-cdk-lib/aws-route53-targets';
import { SSMUtil } from 'aws-cdk-lib-util';

/**
 * Stack creating the API GW v2
 */
export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props?: APIStackProps) {
    super(scope, id, props);

    const { domainName, projectName, stackEnv } = props;

    const [domainCertArn, lambdaApiArn] = [
      PARAM_ACM_DOMAIN_ARN,
      PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
    ].map(
      (paramName) => <string>SSMUtil.getSSMParameter({
          scope: this,
          projectName,
          stackEnv,
          paramName,
        })
    );

    const domainNameApi = new CfnDomainName(
      this,
      `${projectName}-APIGW-Domain-TLD-${stackEnv}`,
      {
        domainName: `api.${domainName}`,
        domainNameConfigurations: [
          {
            certificateArn: domainCertArn,
            endpointType: 'REGIONAL',
          },
        ],
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
      target: RecordTarget.fromAlias(
        new ApiGatewayv2DomainProperties(
          domainNameApi.attrRegionalDomainName,
          domainNameApi.attrRegionalHostedZoneId
        )
      ),
    });

    const origins = [`https://${domainName}`, `https://cv.${domainName}`];

    const httpApi = new CfnApi(this, `${projectName}-API-GW-${stackEnv}`, {
      name: `${projectName}-API-${stackEnv}`,
      description: `${projectName} API GW for serverless functionality`,
      protocolType: 'HTTP',
      corsConfiguration: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
        ],
        exposeHeaders: ['Content-Disposition', 'Content-Type'],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT'],
        allowOrigins:
          stackEnv === ENV.DEV
            ? [...origins, 'http://localhost:4200']
            : origins,
        maxAge: Duration.minutes(5).toSeconds(),
      },
    });

    const lambdaApiCfnIntegration = new CfnIntegration(
      this,
      `${projectName}-API-Integration-${stackEnv}`,
      {
        apiId: httpApi.ref,
        integrationType: 'AWS_PROXY',
        payloadFormatVersion: '1.0',
        integrationUri: lambdaApiArn,
      }
    );

    new CfnRoute(this, `${projectName}-API-GW-Default-Route-${stackEnv}`, {
      apiId: httpApi.ref,
      routeKey: '$default',
      target: `integrations/${lambdaApiCfnIntegration.ref}`,
    });

    new CfnRoute(this, `${projectName}-API-GW-CORS-Route-${stackEnv}`, {
      apiId: httpApi.ref,
      routeKey: 'OPTIONS /{proxy+}',
    });

    const stage = new CfnStage(this, `${projectName}-Stage-${stackEnv}`, {
      apiId: httpApi.ref,
      autoDeploy: true,
      stageName: stackEnv.toLowerCase(),
    });

    const tldMapping = new CfnApiMapping(
      this,
      `${projectName}-API-DNS-Mapping-${stackEnv}`,
      {
        apiId: httpApi.ref,
        domainName: domainNameApi.domainName,
        stage: stage.ref,
      }
    );

    tldMapping.node.addDependency(domainNameApi);

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: PARAM_API_GW_ID,
      value: httpApi.ref,
    });
  }
}
