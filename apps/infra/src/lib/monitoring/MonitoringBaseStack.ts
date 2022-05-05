import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MonitoringBaseStackProps } from '../../interfaces';
import { PARAM_SNS_ALARMS_ARN } from '../../config';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { SSMUtil } from 'aws-cdk-lib-util';

/**
 * Creates baseline infrastructure needed to deploy components, which will be used by Monitoring
 */
export class MonitoringBaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: MonitoringBaseStackProps) {
    super(scope, id, props);

    const { projectName, stackEnv } = props;

    const alarmTopic = new Topic(
      this,
      `${projectName}-Topic-Alarm-${stackEnv}`,
      {
        topicName: `${projectName}-Alarms-${stackEnv}`,
      }
    );

    SSMUtil.createSSMParameter({
      scope: this,
      projectName,
      stackEnv,
      paramName: PARAM_SNS_ALARMS_ARN,
      value: alarmTopic.topicArn,
    });
  }
}
