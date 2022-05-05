#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { PROJECT_NAME } from '../config';
import { lambdaApiMock } from '../config/lambda';
import { CDKDirectoryUtil, LambdaUtilStack } from 'aws-cdk-lib-util';

const app = new App();

const ENV = process.env.ENV;

CDKDirectoryUtil.checkArtifactDirectoryExists(lambdaApiMock.artifactPath);

new LambdaUtilStack(app, `${lambdaApiMock.name}-${ENV}`, {
  env: {
    account: process.env.AWS_CDK_ACCOUNT,
    region: process.env.AWS_CDK_REGION,
  },
  lambda: lambdaApiMock,
  projectName: PROJECT_NAME,
  stackEnv: ENV,
});
