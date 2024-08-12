import { Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { APIStackProps } from '../../interfaces';
import {
  CfnApi,
  CfnAuthorizer,
  CfnIntegration,
  CfnRoute,
  CfnStage,
} from 'aws-cdk-lib/aws-apigatewayv2';
import {
  ENV,
  PARAM_API_GW_ID,
  PARAM_LAMBDA_API_AUTH_GATEWAY_ALIAS_ARN,
  PARAM_LAMBDA_API_CHAT_ALIAS_ARN,
  PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
} from '../../config';
import { SSMUtil } from 'aws-cdk-lib-util';

/**
 * Stack creating the API GW v2
 */
export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props?: APIStackProps) {
    super(scope, id, props);

    const { authIdentitySource, domainName, env, projectName, stackEnv } =
      props;

    const [
      // domainCertArn,
      lambdaApiMainArn,
      lambdaApiAuthGatewayArn,
      lambdaApiChatArn,
    ] = [
      // PARAM_ACM_DOMAIN_ARN,
      PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
      PARAM_LAMBDA_API_AUTH_GATEWAY_ALIAS_ARN,
      PARAM_LAMBDA_API_CHAT_ALIAS_ARN,
    ].map(
      (paramName) => <string>SSMUtil.getSSMParameter({
          scope: this,
          projectName,
          stackEnv,
          paramName,
        })
    );
    //
    // const domainNameApi = new CfnDomainName(
    //   this,
    //   `${projectName}-APIGW-Domain-TLD-${stackEnv}`,
    //   {
    //     domainName: `api.${domainName}`,
    //     domainNameConfigurations: [
    //       {
    //         certificateArn: domainCertArn,
    //         endpointType: 'REGIONAL',
    //       },
    //     ],
    //   }
    // );
    //
    // const zone = HostedZone.fromLookup(
    //   this,
    //   `${projectName}-R53-Zone-${stackEnv}`,
    //   {
    //     domainName,
    //   }
    // );

    // new ARecord(this, `${projectName}-R53-A-${stackEnv}`, {
    //   zone,
    //   recordName: 'api',
    //   target: RecordTarget.fromAlias(
    //     new ApiGatewayv2DomainProperties(
    //       domainNameApi.attrRegionalDomainName,
    //       domainNameApi.attrRegionalHostedZoneId
    //     )
    //   ),
    // });

    const origins = [
      `https://${
        stackEnv === ENV.PROD
          ? domainName
          : `${stackEnv.toLowerCase()}.${domainName}`
      }`,
    ];

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

    const authorizer = new CfnAuthorizer(
      this,
      `${projectName}-API-Authorizer-${stackEnv}`,
      {
        apiId: httpApi.ref,
        name: `${projectName}-API-Authorizer-${stackEnv}`,
        enableSimpleResponses: true,
        authorizerType: 'REQUEST',
        authorizerPayloadFormatVersion: '2.0',
        authorizerUri: `arn:aws:apigateway:${env.region}:lambda:path/2015-03-31/functions/${lambdaApiAuthGatewayArn}/invocations`,
        identitySource: [`$request.header.${authIdentitySource}`],
      }
    );

    const lambdaApiCfnIntegration = new CfnIntegration(
      this,
      `${projectName}-API-Integration-${stackEnv}`,
      {
        apiId: httpApi.ref,
        integrationType: 'AWS_PROXY',
        payloadFormatVersion: '1.0',
        integrationUri: lambdaApiMainArn,
      }
    );

    const lambdaApiChatCfnIntegration = new CfnIntegration(
      this,
      `${projectName}-API-Chat-Integration-${stackEnv}`,
      {
        apiId: httpApi.ref,
        integrationType: 'AWS_PROXY',
        payloadFormatVersion: '1.0',
        integrationUri: lambdaApiChatArn,
      }
    );

    new CfnRoute(this, `${projectName}-API-GW-Default-Route-${stackEnv}`, {
      apiId: httpApi.ref,
      routeKey: '$default',
      target: `integrations/${lambdaApiCfnIntegration.ref}`,
      authorizationType: 'CUSTOM',
      authorizerId: authorizer.ref,
    });

    new CfnRoute(this, `${projectName}-API-GW-CORS-Route-${stackEnv}`, {
      apiId: httpApi.ref,
      routeKey: 'OPTIONS /{proxy+}',
    });

    new CfnRoute(this, `${projectName}-API-GW-Chat-GET-Route-${stackEnv}`, {
      apiId: httpApi.ref,
      routeKey: 'GET /v1/chat/{proxy+}',
      target: `integrations/${lambdaApiChatCfnIntegration.ref}`,
      authorizationType: 'CUSTOM',
      authorizerId: authorizer.ref,
    });

    new CfnRoute(this, `${projectName}-API-GW-Chat-POST-Route-${stackEnv}`, {
      apiId: httpApi.ref,
      routeKey: 'POST /v1/chat/{proxy+}',
      target: `integrations/${lambdaApiChatCfnIntegration.ref}`,
      authorizationType: 'CUSTOM',
      authorizerId: authorizer.ref,
    });

    new CfnStage(this, `${projectName}-Stage-${stackEnv}`, {
      apiId: httpApi.ref,
      autoDeploy: true,
      stageName: stackEnv.toLowerCase(),
    });

    // const tldMapping = new CfnApiMapping(
    //   this,
    //   `${projectName}-API-DNS-Mapping-${stackEnv}`,
    //   {
    //     apiId: httpApi.ref,
    //     domainName: domainNameApi.domainName,
    //     stage: stage.ref,
    //   }
    // );
    //
    // tldMapping.node.addDependency(domainNameApi);

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: PARAM_API_GW_ID,
      value: httpApi.ref,
    });
  }
}
