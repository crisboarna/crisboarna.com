#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { APIStack } from '../lib/api/APIStack';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env[APIConstants.ENV];

new APIStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    description: `Stack containing the serverless API GW fronting the personal domain backend`,
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: process.env.AWS_CDK_REGION,
    },
    domainName: process.env.AWS_CDK_DOMAIN_NAME,
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
