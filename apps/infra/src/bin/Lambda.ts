#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import {
  lambdaAuthCdn,
  lambdaAuthGateway,
  lambdaApiMain,
  lambdaApiChat,
} from '../config/lambda';
import { CDKDirectoryUtil, LambdaUtilStack } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';
import { ENV } from '../config';

const app = new App();

const STACK_ENV = process.env[APIConstants.ENV];

CDKDirectoryUtil.checkArtifactDirectoryExists(lambdaApiMain.artifactPath);

new LambdaUtilStack(app, `${lambdaApiMain.name}-${STACK_ENV}`, {
  env: {
    account: process.env.AWS_CDK_ACCOUNT,
    region: process.env.AWS_CDK_REGION,
  },
  lambda: lambdaApiMain,
  projectName: APIConstants.PROJECT_NAME,
  stackEnv: STACK_ENV,
});

new LambdaUtilStack(app, `${lambdaApiChat.name}-${STACK_ENV}`, {
  env: {
    account: process.env.AWS_CDK_ACCOUNT,
    region: process.env.AWS_CDK_REGION,
  },
  lambda: lambdaApiChat,
  projectName: APIConstants.PROJECT_NAME,
  stackEnv: STACK_ENV,
});

new LambdaUtilStack(app, `${lambdaAuthGateway.name}-${STACK_ENV}`, {
  env: {
    account: process.env.AWS_CDK_ACCOUNT,
    region: process.env.AWS_CDK_REGION,
  },
  lambda: lambdaAuthGateway,
  projectName: APIConstants.PROJECT_NAME,
  stackEnv: STACK_ENV,
});

if (STACK_ENV !== ENV.PROD) {
  new LambdaUtilStack(app, `${lambdaAuthCdn.name}-${STACK_ENV}`, {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: 'us-east-1',
    },
    lambda: lambdaAuthCdn,
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: STACK_ENV,
  });
}
