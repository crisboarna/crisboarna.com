#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import {
  CI_OIDP_CLIENT_ID,
  CI_OIDP_OWNER,
  CI_OIDP_THUMBPRINT,
  CI_OIDP_URL,
} from '../config';
import { CIStack } from '../lib/ci/CIStack';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';

const app = new App();

const ENV = process.env[APIConstants.ENV];

new CIStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-${ENV}`,
  {
    description: `Stack containing the CI role & OIDC to be assumed by Github Actions`,
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: process.env.AWS_CDK_REGION || 'us-east-1',
    },
    url: CI_OIDP_URL,
    clientIds: CI_OIDP_CLIENT_ID,
    thumbprints: CI_OIDP_THUMBPRINT,
    owner: CI_OIDP_OWNER,
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
