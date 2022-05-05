import { ENV, PROJECT_NAME } from '../../../src/config';
import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { APIStackProps } from '../../../src/interfaces';
import { APIStack } from '../../../src/lib/api/APIStack';

describe('APIStack', function () {
  // given
  let app;
  let stackEnv;
  const projectName = PROJECT_NAME;
  const domainName = 'domainName';
  const env = {
    account: '1234567891234',
    region: 'us-east-1',
  };

  beforeEach(() => {
    app = new App();
  });

  test('stack has expected properties', () => {
    stackEnv = 'stackEnv';
    // given
    const props: APIStackProps = {
      projectName,
      stackEnv,
      domainName,
      env,
    };

    // when
    const stack = new APIStack(app, 'APIStack', props);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
      CorsConfiguration: {
        AllowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
        ],
        AllowMethods: ['OPTIONS', 'GET', 'POST', 'PUT'],
        AllowOrigins: [`https://${domainName}`, `https://cv.${domainName}`],
        ExposeHeaders: ['Content-Disposition', 'Content-Type'],
        MaxAge: 300,
      },
      Description: `${projectName} API GW for serverless functionality`,
      Name: `${projectName}-API-${stackEnv}`,
      ProtocolType: 'HTTP',
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Integration', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      IntegrationType: 'AWS_PROXY',
      IntegrationUri: {
        Ref: Match.anyValue(),
      },
      PayloadFormatVersion: '1.0',
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      RouteKey: '$default',
      Target: {
        'Fn::Join': [
          '',
          [
            'integrations/',
            {
              Ref: Match.anyValue(),
            },
          ],
        ],
      },
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      RouteKey: 'OPTIONS /{proxy+}',
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Stage', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      StageName: stackEnv.toLowerCase(),
      AutoDeploy: true,
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Value: {
        Ref: Match.anyValue(),
      },
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/apigw/id/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });

  test('stack has expected properties with DEV env', () => {
    stackEnv = ENV.DEV;
    // given
    const props: APIStackProps = {
      projectName,
      stackEnv: ENV.DEV,
      domainName,
      env,
    };

    // when
    const stack = new APIStack(app, 'APIStack', props);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
      CorsConfiguration: {
        AllowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
        ],
        AllowMethods: ['OPTIONS', 'GET', 'POST', 'PUT'],
        AllowOrigins: [
          `https://${domainName}`,
          `https://cv.${domainName}`,
          'http://localhost:4200',
        ],
        ExposeHeaders: ['Content-Disposition', 'Content-Type'],
        MaxAge: 300,
      },
      Description: `${projectName} API GW for serverless functionality`,
      Name: `${projectName}-API-${stackEnv}`,
      ProtocolType: 'HTTP',
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Integration', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      IntegrationType: 'AWS_PROXY',
      IntegrationUri: {
        Ref: Match.anyValue(),
      },
      PayloadFormatVersion: '1.0',
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      RouteKey: '$default',
      Target: {
        'Fn::Join': [
          '',
          [
            'integrations/',
            {
              Ref: Match.anyValue(),
            },
          ],
        ],
      },
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      RouteKey: 'OPTIONS /{proxy+}',
    });

    template.hasResourceProperties('AWS::ApiGatewayV2::Stage', {
      ApiId: {
        Ref: Match.anyValue(),
      },
      StageName: stackEnv.toLowerCase(),
      AutoDeploy: true,
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Value: {
        Ref: Match.anyValue(),
      },
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/apigw/id/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });
});
