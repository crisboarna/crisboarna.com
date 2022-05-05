#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { PROJECT_NAME } from '../config';
import { MonitoringWrapperStack } from '../lib/monitoring/MonitoringWrapperStack';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';

const app = new App();

const ENV = process.env.ENV;

new MonitoringWrapperStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: process.env.AWS_CDK_REGION,
    },
    projectName: PROJECT_NAME,
    stackEnv: ENV,
  }
);
