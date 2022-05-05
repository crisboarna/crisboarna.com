import { PROJECT_NAME } from '../../../src/config';
import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { CIStackProps } from '../../../src/interfaces';
import { CIStack } from '../../../src/lib/ci/CIStack';

describe('CIStack', function () {
  // given
  let app;
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';
  const owner = 'owner';
  const url = 'url';
  const clientIds = ['clientId'];

  beforeEach(() => {
    app = new App();
  });

  test('stack has expected properties', () => {
    // given
    const props: CIStackProps = {
      clientIds,
      owner,
      url,
      projectName,
      stackEnv,
    };
    // when
    const stack = new CIStack(app, 'CIStack', props);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('Custom::AWSCDKOpenIdConnectProvider', {
      ServiceToken: {
        'Fn::GetAtt': [Match.anyValue(), 'Arn'],
      },
      ClientIDList: ['clientId'],
      Url: `https://${url}`,
    });

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
      },
      ManagedPolicyArns: [
        {
          'Fn::Sub':
            'arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        },
      ],
      Policies: [
        {
          PolicyName: 'Inline',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Resource: '*',
                Action: [
                  'iam:CreateOpenIDConnectProvider',
                  'iam:DeleteOpenIDConnectProvider',
                  'iam:UpdateOpenIDConnectProviderThumbprint',
                  'iam:AddClientIDToOpenIDConnectProvider',
                  'iam:RemoveClientIDFromOpenIDConnectProvider',
                ],
              },
            ],
          },
        },
      ],
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      Code: {
        S3Bucket: {
          'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
        },
      },
      Timeout: 900,
      MemorySize: 128,
      Handler: '__entrypoint__.handler',
      Role: {
        'Fn::GetAtt': [Match.anyValue(), 'Arn'],
      },
      Runtime: 'nodejs12.x',
    });

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringLike: {
                'url:sub': `repo:${owner}/*:*`,
              },
              StringEquals: {
                'url:aud': 'clientId',
              },
            },
            Effect: 'Allow',
            Principal: {
              Federated: {
                Ref: Match.anyValue(),
              },
            },
          },
        ],
        Version: '2012-10-17',
      },
      Description: 'Role used by Github Actions',
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/PowerUserAccess',
            ],
          ],
        },
      ],
      RoleName: `${projectName}-CI-Role-${stackEnv}`,
    });
  });
});
