#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { CONTEXT_GLOBAL_CONSTRUCTS, PROJECT_NAME } from '../config';
import { MonitoringBaseStack } from '../lib/monitoring/MonitoringBaseStack';
import { CDKContextUtil, CDKDirectoryUtil } from 'aws-cdk-lib-util';

const app = new App();

const ENV = process.env.ENV;

const isGlobalConstructsStack = CDKContextUtil.hasContextKey(
  app,
  CONTEXT_GLOBAL_CONSTRUCTS
);

new MonitoringBaseStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: isGlobalConstructsStack
        ? 'us-east-1'
        : process.env.AWS_CDK_REGION,
    },
    projectName: PROJECT_NAME,
    stackEnv: ENV,
  }
);
