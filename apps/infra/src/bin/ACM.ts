#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import {
  CONTEXT_GLOBAL_CONSTRUCTS,
  PARAM_ACM_DOMAIN_ARN,
  PARAM_ACM_DOMAIN_ARN_CF,
  PROJECT_NAME,
} from '../config';
import { ACMStack } from '../lib/acm/ACMStack';
import { CDKContextUtil, CDKDirectoryUtil } from 'aws-cdk-lib-util';

const app = new App();

const ENV = process.env.ENV;

const isGlobalConstructsStack = CDKContextUtil.hasContextKey(
  app,
  CONTEXT_GLOBAL_CONSTRUCTS
);

new ACMStack(
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
    domainCertParamName: isGlobalConstructsStack
      ? PARAM_ACM_DOMAIN_ARN_CF
      : PARAM_ACM_DOMAIN_ARN,
    domainName: process.env.AWS_CDK_DOMAIN_NAME,
    domainZoneId: process.env.AWS_CDK_DOMAIN_ZONE_ID,
    projectName: PROJECT_NAME,
    stackEnv: ENV,
  }
);
