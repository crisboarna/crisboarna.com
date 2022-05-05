#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { APIStack } from '../lib/api/APIStack';
import { PROJECT_NAME } from '../config';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';

const app = new App();

const ENV = process.env.ENV;

new APIStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
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
    projectName: PROJECT_NAME,
    stackEnv: ENV,
  }
);
