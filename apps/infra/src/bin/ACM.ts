#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { PARAM_ACM_DOMAIN_ARN_CF } from '../config';
import { ACMStack } from '../lib/acm/ACMStack';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env[APIConstants.ENV];

new ACMStack(
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
    domainCertParamName: PARAM_ACM_DOMAIN_ARN_CF,
    domainName: process.env.AWS_CDK_DOMAIN_NAME,
    domainZoneId: process.env.AWS_CDK_DOMAIN_ZONE_ID,
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
