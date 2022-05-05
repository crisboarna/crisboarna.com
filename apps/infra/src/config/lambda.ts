import * as path from 'path';
import {
  PARAM_LAMBDA_API_MOCK_ALIAS_ARN,
  PARAM_LAMBDA_API_MOCK_ROLE_ARN,
  PARAM_SNS_ALARMS_ARN,
  PROJECT_NAME,
} from './index';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { getApiIAMPolicies } from '../lib/lambda/util';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { CDKStringUtil, LambdaProps } from 'aws-cdk-lib-util';

const rootArtifactPath = './../../../../dist/apps';

//====API===
const subPathApi = 'api';
const rootArtifactApiPath = `${rootArtifactPath}/api`;

//===Mock===

const lambdaNameApiMock = 'mock';
const artifactPathApiMock = path.join(
  __dirname,
  `${rootArtifactApiPath}/${lambdaNameApiMock}`
);
const nameCapitalizedAPiMock = `${CDKStringUtil.capitalizeInputString(
  subPathApi
)}-${CDKStringUtil.capitalizeInputString(lambdaNameApiMock)}`;

export const lambdaApiMock: LambdaProps = {
  alarmTopicParam: PARAM_SNS_ALARMS_ARN,
  artifactPath: artifactPathApiMock,
  environmentGeneration: () => ({ APP_NAME: nameCapitalizedAPiMock }),
  extraActions: ({ lambdaAlias }) =>
    lambdaAlias.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com')),
  isInVpc: false,
  isProvisioned: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  memorySize: 128,
  name: `${PROJECT_NAME}-${nameCapitalizedAPiMock}`,
  paramName: PARAM_LAMBDA_API_MOCK_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_API_MOCK_ROLE_ARN,
  runtime: Runtime.NODEJS_14_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameApiMock)(env, PROJECT_NAME, stackEnv),
};
