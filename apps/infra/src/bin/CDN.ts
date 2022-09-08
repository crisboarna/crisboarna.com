#!/usr/bin/env node
import {
  PARAM_ACM_DOMAIN_ARN_CF,
  PARAM_API_GW_ID,
  PARAM_CDN_ID_API,
} from '../config';
import { CDNStack } from '../lib/cdn/CDNStack';
import { App } from 'aws-cdk-lib';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env[APIConstants.ENV];

new CDNStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
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
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
