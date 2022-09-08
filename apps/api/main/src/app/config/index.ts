import * as path from 'path';
import { CatchAllController } from '../controllers/CatchAllController';
import { ContactController } from '../controllers/ContactController';
import { ContactService } from '../services/ContactService';
import { SESService } from '../services/SESService';
import { APIConstants } from '@crisboarna.com/common-api';

const rootDir = path.resolve(`${__dirname}/..`);

export const getServerConfig: (
  env: string
) => Partial<TsED.Configuration> = () => ({
  rootDir,
  acceptMimes: ['application/json'],
  logger: {
    debug: true,
    logRequest: true,
    requestFields: [
      'reqId',
      'method',
      'url',
      'headers',
      'query',
      'params',
      'duration',
    ],
  },
  ajv: {
    errorFormatter: (error) =>
      `At ${error.modelName}${error.schemaPath}, value '${JSON.stringify(
        error.data
      )}' ${error.message}`,
    verbose: true,
  },
  mount: {
    [`/v1`]: [ContactController, CatchAllController],
    ['/']: [CatchAllController],
  },
  componentsScan: [ContactService, SESService],
  swagger: [
    {
      path: `${
        process.env[APIConstants.CLOUD_DEPLOYED] === 'true'
          ? 'swagger'
          : `/swagger`
      }`,
      fileName: 'openapi3',
      spec: {
        info: {
          title: 'crisboarna API',
          description:
            '# Introduction \n\n This API provides all crisboarna.com functionality.',
          version: '1.0.0',
          contact: { email: 'contact@crisboarna.com' },
        },
      },
    },
  ],
});
