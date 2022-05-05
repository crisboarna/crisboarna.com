#!/usr/bin/env node
import {
  PARAM_ACM_DOMAIN_ARN_CF,
  PARAM_API_GW_ID,
  PARAM_CDN_ID_API,
  PROJECT_NAME,
} from '../config';
import { CDNStack } from '../lib/cdn/CDNStack';
import { App } from 'aws-cdk-lib';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';

const app = new App();

const ENV = process.env.ENV;

new CDNStack(
  app,
  `${PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: 'us-east-1',
    },
    apiIdParamName: PARAM_API_GW_ID,
    apiRegion: process.env.AWS_CDK_REGION,
    cdnParamName: PARAM_CDN_ID_API,
    domainName: process.env.AWS_CDK_DOMAIN_NAME,
    domainCertParamName: PARAM_ACM_DOMAIN_ARN_CF,
    projectName: PROJECT_NAME,
    stackEnv: ENV,
  }
);
