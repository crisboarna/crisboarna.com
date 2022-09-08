#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { MonitoringWrapperStack } from '../lib/monitoring/MonitoringWrapperStack';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env[APIConstants.ENV];

new MonitoringWrapperStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: process.env.AWS_CDK_REGION,
    },
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
