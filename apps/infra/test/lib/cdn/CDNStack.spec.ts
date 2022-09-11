import { PROJECT_NAME } from '../../../src/config';
import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { CDNStackWeb } from '../../../src/lib/cdn/CDNStack';
import { CDNStackProps } from '../../../src/interfaces';

describe('CDNStack', function () {
  // given
  let app;
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';
  const domainCertParamName = 'domainCertParamName';
  const domainName = 'domainName';
  const apiIdParamName = 'apiIdParamName';
  const apiRegion = 'apiRegion';
  const cdnParamName = 'cdnParamName';
  const env = {
    account: '1234567891234',
    region: 'us-east-1',
  };

  beforeEach(() => {
    app = new App();
  });

  test('stack has expected properties', () => {
    // given
    const props: CDNStackProps = {
      apiIdParamName,
      apiRegion,
      cdnParamNameApi: cdnParamName,
      env,
      domainCertParamName,
      domainName,
      projectName,
      stackEnv,
    };

    // when
    const stack = new CDNStackWeb(app, 'CDNStack', props);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'ssm:GetParameter',
            Effect: 'Allow',
            Resource: `arn:aws:ssm:${apiRegion}:${
              env.account
            }:parameter/${projectName.toLowerCase()}/${apiIdParamName}${stackEnv.toLowerCase()}`,
          },
        ],
        Version: '2012-10-17',
      },
    });

    template.hasResourceProperties('Custom::AWS', {
      ServiceToken: {
        'Fn::GetAtt': [Match.anyValue(), 'Arn'],
      },
      Create: Match.stringLikeRegexp(
        `{"service":"SSM","action":"getParameter","region":"apiRegion","parameters":{"Name":"/${projectName.toLowerCase()}/${apiIdParamName}${stackEnv.toLowerCase()}"},"physicalResourceId":{"id":"`
      ),
      Update: Match.stringLikeRegexp(
        `{"service":"SSM","action":"getParameter","region":"apiRegion","parameters":{"Name":"/${projectName.toLowerCase()}/${apiIdParamName}${stackEnv.toLowerCase()}"},"physicalResourceId":{"id":"`
      ),
      InstallLatestAwsSdk: true,
    });

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
        Version: '2012-10-17',
      },
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            ],
          ],
        },
      ],
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: `${projectName}-Infra-CDN-SSM-Get-${stackEnv}`,
      Handler: 'index.handler',
      Runtime: 'nodejs12.x',
      Timeout: 120,
    });

    template.hasResourceProperties('AWS::WAFv2::WebACL', {
      DefaultAction: {
        Allow: {},
      },
      Scope: 'CLOUDFRONT',
      VisibilityConfig: {
        CloudWatchMetricsEnabled: true,
        MetricName: `${projectName.toLowerCase()}-waf-access-${stackEnv.toLowerCase()}`,
        SampledRequestsEnabled: true,
      },
      Description: `WAF for ${projectName} API`,
      Name: `${projectName}-WAF-${stackEnv}`,
      Rules: [
        {
          Action: {
            Block: {},
          },
          Name: 'IPRateLimiting',
          Priority: 0,
          Statement: {
            RateBasedStatement: {
              AggregateKeyType: 'IP',
              Limit: 100,
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: `${projectName.toLowerCase()}-waf-ip-rate-${stackEnv.toLowerCase()}`,
            SampledRequestsEnabled: true,
          },
        },
        {
          Name: 'AWS-AWSManagedRulesAmazonIpReputationList',
          OverrideAction: {
            None: {},
          },
          Priority: 10,
          Statement: {
            ManagedRuleGroupStatement: {
              Name: 'AWSManagedRulesAmazonIpReputationList',
              VendorName: 'AWS',
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AWSManagedRulesAmazonIpReputationList',
            SampledRequestsEnabled: true,
          },
        },
        {
          Name: 'AWS-AWSManagedRulesCommonRuleSet',
          OverrideAction: {
            None: {},
          },
          Priority: 20,
          Statement: {
            ManagedRuleGroupStatement: {
              ExcludedRules: [],
              Name: 'AWSManagedRulesCommonRuleSet',
              VendorName: 'AWS',
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AWS-AWSManagedRulesCommonRuleSet',
            SampledRequestsEnabled: true,
          },
        },
        {
          Name: 'AWSManagedRuleLinux',
          OverrideAction: {
            None: {},
          },
          Priority: 50,
          Statement: {
            ManagedRuleGroupStatement: {
              ExcludedRules: [],
              Name: 'AWSManagedRulesLinuxRuleSet',
              VendorName: 'AWS',
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AWSManagedRuleLinux',
            SampledRequestsEnabled: true,
          },
        },
      ],
    });

    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: [`api.${domainName}`],
        Comment: `${projectName}${stackEnv}`,
        DefaultCacheBehavior: {
          AllowedMethods: ['GET', 'HEAD', 'OPTIONS'],
          CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6',
          Compress: true,
          TargetOriginId: Match.anyValue(),
          ViewerProtocolPolicy: 'redirect-to-https',
        },
        Enabled: true,
        HttpVersion: 'http2',
        IPV6Enabled: true,
        Origins: [
          {
            CustomOriginConfig: {
              OriginProtocolPolicy: 'https-only',
              OriginSSLProtocols: ['TLSv1.2'],
            },
            DomainName: {
              'Fn::Join': [
                '',
                [
                  {
                    'Fn::GetAtt': [Match.anyValue(), 'Parameter.Value'],
                  },
                  `.execute-api.${apiRegion}.amazonaws.com`,
                ],
              ],
            },
            OriginPath: '/prod',
          },
        ],
        ViewerCertificate: {
          AcmCertificateArn: {
            Ref: Match.anyValue(),
          },
          MinimumProtocolVersion: 'TLSv1.2_2021',
          SslSupportMethod: 'sni-only',
        },
        WebACLId: {
          'Fn::GetAtt': [Match.anyValue(), 'Arn'],
        },
      },
    });

    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'api.domainName.',
      Type: 'A',
      AliasTarget: {
        DNSName: {
          'Fn::GetAtt': [Match.anyValue(), 'DomainName'],
        },
        HostedZoneId: {
          'Fn::FindInMap': [
            'AWSCloudFrontPartitionHostedZoneIdMap',
            {
              Ref: 'AWS::Partition',
            },
            'zoneId',
          ],
        },
      },
      HostedZoneId: 'DUMMY',
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Value: {
        Ref: Match.anyValue(),
      },
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/${cdnParamName}${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });
});
