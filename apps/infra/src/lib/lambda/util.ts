import { Environment } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { APIConstants } from '@crisboarna.com/common-api';

export type IAMPolicyGetter = (
  env: Environment,
  projectName: string,
  stackEnv: string
) => PolicyStatement[];

export const getApiIAMPolicies = (name: string): IAMPolicyGetter => {
  switch (name) {
    case 'main':
      return () => [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['ses:SendEmail'],
          resources: ['*'],
        }),
      ];
    case 'chat':
      return () => [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['*'],
          resources: ['*'],
        }),
      ];
    case 'gateway':
      return () => [];
    case 'cdn':
      return (env, projectName, stackEnv) => [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['ssm:GetParameter'],
          resources: [
            `arn:aws:ssm:*:${env.account}:parameter${
              APIConstants.INFRA_CDN_HEADER_AUTH_KEY_NAME
            }${stackEnv.toLowerCase()}`,
            `arn:aws:ssm:*:${env.account}:parameter${
              APIConstants.INFRA_CDN_HEADER_AUTH_VALUE_NAME
            }${stackEnv.toLowerCase()}`,
          ],
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['secretsmanager:GetSecretValue'],
          resources: [
            `arn:aws:secretsmanager:*:${env.account}:secret:${
              APIConstants.INFRA_CDN_HEADER_AUTH_VALUE_NAME
            }${stackEnv.toLowerCase()}*`,
          ],
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['logs:CreateLogGroup'],
          resources: [`arn:aws:logs:*:${env.account}:*`],
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
          resources: [`arn:aws:logs:*:${env.account}:log-group:/aws/lambda/`],
        }),
      ];
    default:
      return () => [];
  }
};
