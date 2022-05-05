import { getApiIAMPolicies } from '../../../src/lib/lambda/util';
import { PROJECT_NAME } from '../../../src/config';

describe('LambdaUtil', () => {
  const projectName = PROJECT_NAME;
  const stackEnv = 'stackEnv';
  const env = {
    account: '1234567891234',
    region: 'us-east-1',
  };

  it('IAM mock policies', () => {
    expect(getApiIAMPolicies('mock')(env, projectName, stackEnv)).toEqual([]);
  });

  it('IAM default policies', () => {
    expect(getApiIAMPolicies('unknown')(env, projectName, stackEnv)).toEqual(
      []
    );
  });
});
