import { PROJECT_NAME } from '../../../src/config';
import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { ACMStack } from '../../../src/lib/acm/ACMStack';
import { ACMStackProps } from '../../../src/interfaces';

describe('ACMStack', function () {
  // given
  let app;
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';
  const domainCertParamName = 'domainCertParamName';
  const domainName = 'domainName';
  const domainZoneId = 'domainZoneId';

  beforeEach(() => {
    app = new App();
  });

  test('stack has expected properties', () => {
    // given
    const props: ACMStackProps = {
      projectName,
      stackEnv,
      domainName,
      domainZoneId,
      domainCertParamName,
    };
    // when
    const stack = new ACMStack(app, 'ACMStack', props);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'domainName',
      DomainValidationOptions: [
        {
          DomainName: 'domainName',
          HostedZoneId: 'domainZoneId',
        },
      ],
      SubjectAlternativeNames: ['*.domainName'],
      ValidationMethod: 'DNS',
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Value: {
        Ref: Match.anyValue(),
      },
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/${domainCertParamName}${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });
});
