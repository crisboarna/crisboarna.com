import { Environment } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export type IAMPolicyGetter = (
  env: Environment,
  projectName: string,
  stackEnv: string
) => PolicyStatement[];

export const getApiIAMPolicies = (name: string): IAMPolicyGetter => {
  switch (name) {
    case 'mock':
      return () => [];
    default:
      return () => [];
  }
};
