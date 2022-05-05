import * as crypto from 'crypto';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const errorId = crypto.randomUUID();

  const allPathSegments = event.path.split('/');
  const publicPathSegments = allPathSegments.slice(2);

  const payload = {
    errorId,
    errorCode: 404,
    message: 'Invalid url',
    field: 'path',
    originalValue: `/${publicPathSegments.join('/')}`,
    // TODO: add swagger doc
    helpUrl: '',
  };

  console.warn(payload);

  return {
    statusCode: 404,
    body: JSON.stringify(payload),
  };
};
