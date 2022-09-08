#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { CONTEXT_GLOBAL_CONSTRUCTS } from '../config';
import { MonitoringBaseStack } from '../lib/monitoring/MonitoringBaseStack';
import { CDKContextUtil, CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env[APIConstants.ENV];

const isGlobalConstructsStack = CDKContextUtil.hasContextKey(
  app,
  CONTEXT_GLOBAL_CONSTRUCTS
);

new MonitoringBaseStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
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
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
