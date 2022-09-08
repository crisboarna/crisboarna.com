import * as path from 'path';
import {
  PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
  PARAM_LAMBDA_API_MAIN_ROLE_ARN,
  PARAM_SNS_ALARMS_ARN,
} from './index';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { getApiIAMPolicies } from '../lib/lambda/util';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { CDKStringUtil, LambdaProps } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';
import { EmailIdentity, Identity } from 'aws-cdk-lib/aws-ses';

const rootArtifactPath = './../../../../dist/apps';

//====API===
const subPathApi = 'api';
const rootArtifactApiPath = `${rootArtifactPath}/api`;

//===Main===
const lambdaNameApiMain = 'main';
const artifactPathApi = path.join(__dirname, `${rootArtifactApiPath}`);
const nameCapitalizedApiMain = `${CDKStringUtil.capitalizeInputString(
  subPathApi
)}-${CDKStringUtil.capitalizeInputString(lambdaNameApiMain)}`;

export const lambdaApiMain: LambdaProps = {
  alarmTopicParam: PARAM_SNS_ALARMS_ARN,
  artifactPath: artifactPathApi,
  environmentGeneration: ((domainName: string, sesEmail: string) => () => ({
    APP_NAME: nameCapitalizedApiMain,
    DOMAIN_NAME: domainName,
    SES_EMAIL: sesEmail,
  })) as never,
  extraActions: ({ scope, lambdaAlias, stackEnv }) => {
    lambdaAlias.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'));
    new EmailIdentity(
      scope,
      `${APIConstants.PROJECT_NAME}-SES-Identity-${stackEnv}`,
      {
        identity: Identity.email(process.env[APIConstants.SES_EMAIL_NAME]),
      }
    );
  },
  isInVpc: false,
  isProvisioned: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  memorySize: 128,
  name: `${APIConstants.PROJECT_NAME}-${nameCapitalizedApiMain}`,
  paramName: PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_API_MAIN_ROLE_ARN,
  runtime: Runtime.NODEJS_14_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameApiMain)(
      env,
      APIConstants.PROJECT_NAME,
      stackEnv
    ),
};
