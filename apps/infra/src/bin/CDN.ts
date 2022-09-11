#!/usr/bin/env node
import {
  PARAM_ACM_DOMAIN_ARN_CF,
  PARAM_API_GW_ID,
  PARAM_CDN_ID_API,
  PARAM_CDN_ID_WEB,
} from '../config';
import { CDNWebStack } from '../lib/cdn/CDNWebStack';
import { CDNApiStack } from '../lib/cdn/CDNApiStack';
import { App } from 'aws-cdk-lib';
import { CDKDirectoryUtil } from 'aws-cdk-lib-util';
import { APIConstants } from '@crisboarna.com/common-api';
import * as path from 'path';

const app = new App();

const ENV = process.env[APIConstants.ENV];

const artifactPathWeb = path.resolve(__dirname, '../../../../dist/apps/web');
CDKDirectoryUtil.checkArtifactDirectoryExists(artifactPathWeb);

new CDNWebStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-Web-${ENV}`,
  {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: 'us-east-1',
    },
    artifactPathWeb,
    cdnParamNameWeb: PARAM_CDN_ID_WEB,
    domainName: process.env.AWS_CDK_DOMAIN_NAME,
    domainCertParamName: PARAM_ACM_DOMAIN_ARN_CF,
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);

new CDNApiStack(
  app,
  `${APIConstants.PROJECT_NAME}-${CDKDirectoryUtil.getStackName(
    __dirname,
    __filename
  )}-Api-${ENV}`,
  {
    env: {
      account: process.env.AWS_CDK_ACCOUNT,
      region: 'us-east-1',
    },
    apiAuthHeaderKey: process.env[APIConstants.INFRA_GATEWAY_HEADER_AUTH_KEY],
    apiAuthHeaderValue:
      process.env[APIConstants.INFRA_GATEWAY_HEADER_AUTH_VALUE],
    apiIdParamName: PARAM_API_GW_ID,
    apiRegion: process.env.AWS_CDK_REGION,
    cdnParamNameApi: PARAM_CDN_ID_API,
    domainName: process.env.AWS_CDK_DOMAIN_NAME,
    domainCertParamName: PARAM_ACM_DOMAIN_ARN_CF,
    projectName: APIConstants.PROJECT_NAME,
    stackEnv: ENV,
  }
);
