import * as path from 'path';
import {
  ENV,
  PARAM_LAMBDA_API_AUTH_CDN_ALIAS_ARN,
  PARAM_LAMBDA_API_AUTH_CDN_ROLE_ARN,
  PARAM_LAMBDA_API_AUTH_CDN_VERSION_ARN,
  PARAM_LAMBDA_API_AUTH_GATEWAY_ALIAS_ARN,
  PARAM_LAMBDA_API_AUTH_GATEWAY_ROLE_ARN,
  PARAM_LAMBDA_API_CHAT_ALIAS_ARN,
  PARAM_LAMBDA_API_CHAT_ROLE_ARN,
  PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
  PARAM_LAMBDA_API_MAIN_ROLE_ARN,
  PARAM_SNS_ALARMS_ARN,
} from './index';
import {Architecture, Runtime} from 'aws-cdk-lib/aws-lambda';
import { getApiIAMPolicies } from '../lib/lambda/util';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import {
  CDKStringUtil,
  LambdaProps,
  SecretManagerUtil,
  SSMUtil,
} from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';
import { EmailIdentity, Identity } from 'aws-cdk-lib/aws-ses';

const rootArtifactPath = './../../../../dist/apps';

//====API===
const subPathApi = 'api';
const rootArtifactApiPath = `${rootArtifactPath}/api`;

//===Main===
const lambdaNameApiMain = 'main';
const artifactPathApiMain = path.join(
  __dirname,
  `${rootArtifactApiPath}/${lambdaNameApiMain}`
);
const nameCapitalizedApiMain = `${CDKStringUtil.capitalizeInputString(
  subPathApi
)}-${CDKStringUtil.capitalizeInputString(lambdaNameApiMain)}`;

export const lambdaApiMain: LambdaProps = {
  alarmTopicParam: PARAM_SNS_ALARMS_ARN,
  artifactPath: artifactPathApiMain,
  environmentGeneration: () => ({
    APP_NAME: nameCapitalizedApiMain,
    DOMAIN_NAME: process.env.AWS_CDK_DOMAIN_NAME,
    SES_EMAIL: process.env[APIConstants.SES_EMAIL_NAME],
  }),
  extraActions: ({ scope, lambdaAlias, stackEnv }) => {
    lambdaAlias.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'));

    let targetEmail;
    if (stackEnv === ENV.PROD) {
      targetEmail = process.env[APIConstants.SES_EMAIL_NAME];
    } else {
      const emailFragments =
        process.env[APIConstants.SES_EMAIL_NAME].split('@');
      targetEmail = `${emailFragments[0]}+${stackEnv.toLowerCase()}@${
        emailFragments[1]
      }`;
    }

    new EmailIdentity(
      scope,
      `${APIConstants.PROJECT_NAME}-SES-Identity-${stackEnv}`,
      {
        identity: Identity.email(targetEmail),
      }
    );
  },
  isInVpc: false,
  isProvisioned: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  architecture: Architecture.ARM_64,
  memorySize: 128,
  name: `${APIConstants.PROJECT_NAME}-${nameCapitalizedApiMain}`,
  paramName: PARAM_LAMBDA_API_MAIN_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_API_MAIN_ROLE_ARN,
  runtime: Runtime.NODEJS_20_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameApiMain)(
      env,
      APIConstants.PROJECT_NAME,
      stackEnv
    ),
};

//===Chat===
const lambdaNameApiChat = 'chat';
const artifactPathApiChat = path.join(
  __dirname,
  `${rootArtifactApiPath}/${lambdaNameApiChat}`
);
const nameCapitalizedApiChat = `${CDKStringUtil.capitalizeInputString(
  subPathApi
)}-${CDKStringUtil.capitalizeInputString(lambdaNameApiChat)}`;

export const lambdaApiChat: LambdaProps = {
  alarmTopicParam: PARAM_SNS_ALARMS_ARN,
  artifactPath: artifactPathApiChat,
  environmentGeneration: () => ({
    APP_NAME: nameCapitalizedApiChat,
  }),
  isInVpc: false,
  isProvisioned: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  architecture: Architecture.ARM_64,
  memorySize: 128,
  name: `${APIConstants.PROJECT_NAME}-${nameCapitalizedApiChat}`,
  paramName: PARAM_LAMBDA_API_CHAT_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_API_CHAT_ROLE_ARN,
  runtime: Runtime.NODEJS_20_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameApiChat)(
      env,
      APIConstants.PROJECT_NAME,
      stackEnv
    ),
};

//===Auth===
const subPathAuth = 'auth';

//===Auth Gateway===
const lambdaNameAuthGateway = 'gateway';
const artifactPathAuthGateway = path.join(
  __dirname,
  `${rootArtifactPath}/${subPathAuth}/${lambdaNameAuthGateway}`
);
const nameCapitalizedAuthGateway = `${CDKStringUtil.capitalizeInputString(
  subPathAuth
)}-${CDKStringUtil.capitalizeInputString(lambdaNameAuthGateway)}`;

export const lambdaAuthGateway: LambdaProps = {
  alarmTopicParam: PARAM_SNS_ALARMS_ARN,
  artifactPath: artifactPathAuthGateway,
  environmentGeneration: () => ({
    APP_NAME: nameCapitalizedAuthGateway,
    [APIConstants.INFRA_GATEWAY_HEADER_AUTH_KEY]:
      process.env[APIConstants.INFRA_GATEWAY_HEADER_AUTH_KEY],
    [APIConstants.INFRA_GATEWAY_HEADER_AUTH_VALUE]:
      process.env[APIConstants.INFRA_GATEWAY_HEADER_AUTH_VALUE],
  }),
  extraActions: ({ lambdaAlias }) =>
    lambdaAlias.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com')),
  isInVpc: false,
  isProvisioned: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  architecture: Architecture.X86_64,
  memorySize: 128,
  name: `${APIConstants.PROJECT_NAME}-${nameCapitalizedAuthGateway}`,
  paramName: PARAM_LAMBDA_API_AUTH_GATEWAY_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_API_AUTH_GATEWAY_ROLE_ARN,
  runtime: Runtime.NODEJS_20_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameAuthGateway)(
      env,
      APIConstants.PROJECT_NAME,
      stackEnv
    ),
};

//===Auth CDN===
const lambdaNameAuthCdn = 'cdn';
const artifactPathAuthCdn = path.join(
  __dirname,
  `${rootArtifactPath}/${subPathAuth}/${lambdaNameAuthCdn}`
);
const nameCapitalizedAuthCdn = `${CDKStringUtil.capitalizeInputString(
  subPathAuth
)}-${CDKStringUtil.capitalizeInputString(lambdaNameAuthCdn)}`;

export const lambdaAuthCdn: LambdaProps = {
  alarmTopicParam: PARAM_SNS_ALARMS_ARN,
  artifactPath: artifactPathAuthCdn,
  environmentGenerationDefaults: false,
  extraActions: ({ scope, lambdaVersion, lambdaRole, stackEnv }) => {
    lambdaRole.assumeRolePolicy.addStatements(
      new PolicyStatement({
        principals: [new ServicePrincipal('edgelambda.amazonaws.com')],
        effect: Effect.ALLOW,
        actions: ['sts:AssumeRole'],
      })
    );
    SSMUtil.createSSMParameter({
      scope,
      projectName: APIConstants.PROJECT_NAME,
      stackEnv,
      paramName: PARAM_LAMBDA_API_AUTH_CDN_VERSION_ARN,
      value: lambdaVersion.edgeArn,
    });
    SSMUtil.createSSMParameter({
      scope,
      projectName: APIConstants.PROJECT_NAME,
      stackEnv,
      paramName: APIConstants.INFRA_CDN_HEADER_AUTH_KEY_NAME,
      value: process.env[APIConstants.INFRA_CDN_HEADER_AUTH_KEY],
    });
    SSMUtil.createSSMParameter({
      scope,
      projectName: APIConstants.PROJECT_NAME,
      stackEnv,
      paramName: APIConstants.INFRA_CDN_HEADER_AUTH_VALUE_NAME,
      value: process.env[APIConstants.INFRA_CDN_HEADER_AUTH_VALUE],
    });
    SecretManagerUtil.createSecretManagerSecret({
      scope,
      projectName: APIConstants.PROJECT_NAME,
      stackEnv,
      paramName: APIConstants.INFRA_CDN_HEADER_AUTH_VALUE_NAME,
      value: {
        user: process.env[APIConstants.INFRA_CDN_CHALLENGE_USER],
        password: process.env[APIConstants.INFRA_CDN_CHALLENGE_PASSWORD],
      },
    });
  },
  isInVpc: false,
  isProvisioned: false,
  generateDlq: false,
  managedPolicies: ['service-role/AWSLambdaBasicExecutionRole'],
  memorySize: 128,
  architecture: Architecture.X86_64,
  timeout: 3,
  name: `${APIConstants.PROJECT_NAME}-${nameCapitalizedAuthCdn}`,
  paramName: PARAM_LAMBDA_API_AUTH_CDN_ALIAS_ARN,
  paramNameRole: PARAM_LAMBDA_API_AUTH_CDN_ROLE_ARN,
  runtime: Runtime.NODEJS_20_X,
  policies: (env, stackEnv) =>
    getApiIAMPolicies(lambdaNameAuthCdn)(
      env,
      APIConstants.PROJECT_NAME,
      stackEnv
    ),
};
