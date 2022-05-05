export const PROJECT_NAME = 'CRISBOARNA';
export const CONTEXT_GLOBAL_CONSTRUCTS = 'GLOBAL_CONSTRUCTS';

export const CI_OIDP_URL = 'token.actions.githubusercontent.com';
export const CI_OIDP_OWNER = 'crisboarna';
export const CI_OIDP_CLIENT_ID = ['sts.amazonaws.com'];
export const CI_OIDP_THUMBPRINT = ['6938fd4d98bab03faadb97b34396831e3780aea1'];

//===PARAMETERS===
//===ACM===
export const PARAM_ACM_DOMAIN_ARN_CF = `acm/domain/cf/arn/`;
export const PARAM_ACM_DOMAIN_ARN = `acm/domain/region/arn/`;

//===APIGW===
export const PARAM_API_GW_ID = `apigw/id/`;

//===CDN===
export const PARAM_CDN_ID_API = `cdn/id/api`;

//===LAMBDA===
export const PARAM_LAMBDA_API_MOCK_ALIAS_ARN = `lambda/alias/arn/api/mock/`;
export const PARAM_LAMBDA_API_MOCK_ROLE_ARN = `lambda/role/arn/api/mock/`;

//===SNS===
export const PARAM_SNS_ALARMS_ARN = `sns/alarms/arn/`;

export enum ENV {
  DEV = 'DEV',
  QA = 'QA',
  UAT = 'UAT',
  PROD = 'PROD',
}
