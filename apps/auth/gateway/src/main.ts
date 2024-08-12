import {
  Handler,
  APIGatewayRequestAuthorizerEvent,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda';
import { APIConstants } from '@crisboarna.com/common-api';

/**
 * API Gateway Custom Authorizer Lambda to check the custom header is present and of expected value to limit API source
 * to Cloudfront as AWS Api Gateway HTTP Api does not support WAF to add rule for this there. Challenge secret retrieved
 * from environment variable plaintext out of costs considerations due to pricing for 2x secret (2 regions) + API invocation
 * cost that is incurred at each API Gateway call. Best practice would be to use Secrets Manager secret and also have
 * secret rotation on it that also updates in other region.
 * @param event
 */
export const handler: Handler<
  APIGatewayRequestAuthorizerEvent,
  APIGatewaySimpleAuthorizerResult
> = (event) => {
  // using Authorizer Simple Response 2.0
  const result: APIGatewaySimpleAuthorizerResult = {
    isAuthorized: false,
  };

  // retrieving env configured authorization header name;
  const header =
    event.headers[process.env[APIConstants.INFRA_GATEWAY_HEADER_AUTH_KEY]];

  // checking if header value equals env configured challenge correct response
  if (header === process.env[APIConstants.INFRA_GATEWAY_HEADER_AUTH_VALUE]) {
    result.isAuthorized = true;
  }

  return Promise.resolve(result);
};
