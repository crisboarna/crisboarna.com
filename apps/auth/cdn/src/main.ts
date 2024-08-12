import {
  Handler,
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
} from 'aws-lambda';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { APIConstants } from '@crisboarna.com/common-api';
import { $log } from '@tsed/logger';
import { ENV } from './assets';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { SSM, SecretsManager } = require('aws-sdk');

// const ssm = new SSM();
// const secretsManager = new SecretsManager();

// const region = 'us-east-1';
const invalidResponse: CloudFrontRequestResult = {
  status: '401',
  statusDescription: 'Unauthorized',
  body: 'Unauthorized',
  headers: {
    'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],
  },
} as any;

const errorResponse: CloudFrontRequestResult = {
  status: '500',
  statusDescription: 'Internal Server Error',
  body: 'Internal Server Error',
} as any;

/**
 * Cloudfront Lambda@Edge function for non-prod environments to provide Basic Auth password functionality to limit audience
 * to website for users
 * @param event
 * @param _
 * @param cb
 */
export const handler: Handler<
  CloudFrontRequestEvent,
  CloudFrontRequestResult | CloudFrontRequestEvent
> = async (event, _, cb): Promise<CloudFrontRequestResult> => {
  const ssmClient = new SSMClient();
  const parameterName = `${
    APIConstants.INFRA_CDN_HEADER_AUTH_KEY_NAME
  }${ENV.toLowerCase()}`;
  const headerKeyParameter = await ssmClient.send(
    new GetParameterCommand({
      Name: parameterName,
    })
  );
  // const headerKeyParameter = await ssm
  //   .getParameter({
  //     Name: parameterName,
  //   })
  //   .promise();
  const headerKey = headerKeyParameter.Parameter.Value;

  // if no auth header present return auth challenge immediately
  if (
    typeof event.Records[0].cf.request.headers[headerKey.toLowerCase()] ===
    'undefined'
  ) {
    cb(null, invalidResponse);
    return;
  }

  // get provided challenge
  const inputHeaderSecret =
    event.Records[0].cf.request.headers[headerKey.toLowerCase()];

  // setup aws secrets manager client to retrieve expected auth challenge details
  const secretsClient = new SecretsManagerClient();

  const SecretId = `${
    APIConstants.INFRA_CDN_HEADER_AUTH_VALUE_NAME
  }${ENV.toLowerCase()}`;

  // retrieve secret
  const secretValue = await secretsClient.send(
    new GetSecretValueCommand({
      SecretId,
    })
  );
  // const secretValue = await secretsManager
  //   .getSecretValue({
  //     SecretId,
  //   })
  //   .promise();

  let secretString;
  if (secretValue && secretValue.SecretString) {
    secretString = secretValue.SecretString;
  } else {
    // if secret missing or configuration wrong, return an errors
    $log.error(`Could not find secret: ${SecretId}`);
    cb(null, errorResponse);
    return;
  }

  const secretPayload: { user: string; password: string } =
    JSON.parse(secretString);

  // if secret missing property, error out
  if (!secretPayload.user || !secretPayload.password) {
    $log.error(`Invalid secret value contained in ${SecretId}`);
    cb(null, errorResponse);
    return;
  }

  // generate expected challenge based on secret data
  const expectedSecret =
    'Basic ' +
    Buffer.from(secretPayload.user + ':' + secretPayload.password).toString(
      'base64'
    );

  // check if challenge is correct
  if (inputHeaderSecret[0].value !== expectedSecret) {
    cb(null, invalidResponse);
  }

  // if we reached here, auth success
  cb(null, event.Records[0].cf.request);
};
