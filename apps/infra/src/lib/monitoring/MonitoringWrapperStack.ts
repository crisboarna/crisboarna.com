import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MonitoringWrapperStackProps } from '../../interfaces';

/**
 * Creates monitoring and alarming for deployed components
 */
export class MonitoringWrapperStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: MonitoringWrapperStackProps
  ) {
    super(scope, id, props);

    // const { projectName, stackEnv } = props;
    //
    // StackUtils.createSSMParameter({
    //   scope: this,
    //   projectName,
    //   stackEnv,
    //   paramName: PARAM_API_GW_ID,
    //   value: httpApi.ref,
    // });
  }
}
