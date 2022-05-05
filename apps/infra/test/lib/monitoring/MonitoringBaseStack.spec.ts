import { PROJECT_NAME } from '../../../src/config';
import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { MonitoringBaseStackProps } from '../../../src/interfaces';
import { MonitoringBaseStack } from '../../../src/lib/monitoring/MonitoringBaseStack';

describe('MonitoringBaseStack', function () {
  // given
  let app;
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';

  beforeEach(() => {
    app = new App();
  });

  test('stack has expected properties', () => {
    // given
    const props: MonitoringBaseStackProps = {
      projectName,
      stackEnv,
    };

    // when
    const stack = new MonitoringBaseStack(app, 'MonitoringBaseStack', props);

    // then
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::SNS::Topic', {
      TopicName: `${projectName}-Alarms-${stackEnv}`,
    });

    template.hasResourceProperties('AWS::SSM::Parameter', {
      Type: 'String',
      Value: {
        Ref: Match.anyValue(),
      },
      Description: projectName,
      Name: `/${projectName.toLowerCase()}/sns/alarms/arn/${stackEnv.toLowerCase()}`,
      Tier: 'Standard',
    });
  });
});
