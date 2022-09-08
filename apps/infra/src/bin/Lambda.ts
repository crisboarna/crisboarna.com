#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { lambdaApiMain } from '../config/lambda';
import { CDKDirectoryUtil, LambdaUtilStack } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env.ENV;

CDKDirectoryUtil.checkArtifactDirectoryExists(lambdaApiMain.artifactPath);

new LambdaUtilStack(app, `${lambdaApiMain.name}-${ENV}`, {
  env: {
    account: process.env.AWS_CDK_ACCOUNT,
    region: process.env.AWS_CDK_REGION,
  },
  lambda: {
    ...lambdaApiMain,
    // @ts-ignore
    environmentGeneration: lambdaApiMain.environmentGeneration(
      // @ts-ignore
      process.env.AWS_CDK_DOMAIN_NAME,
      process.env[APIConstants.SES_EMAIL_NAME]
    ),
  },
  projectName: APIConstants.PROJECT_NAME,
  stackEnv: ENV,
});
