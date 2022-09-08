import bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import '@tsed/swagger';
import '@tsed/ajv';
import {
  $log as serverLogger,
  Configuration,
  Inject,
  PlatformAcceptMimesMiddleware,
  PlatformApplication,
} from '@tsed/common';
import { getServerConfig } from './config';
import { $log } from '@tsed/logger';
import { APIConstants } from '@crisboarna.com/common-api';

@Configuration(getServerConfig(process.env[APIConstants.ENV]))
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeInit() {
    [serverLogger, $log].forEach((logger) => {
      logger.appenders.delete('stdout');
      logger.appenders.delete('stderr');
      logger.appenders.set('std-log-json', {
        type: 'stdout',
        layout: { type: 'json', separator: ',' },
        level: ['debug', 'info', 'trace'],
      });
      logger.appenders.set('std-err-json', {
        type: 'stderr',
        layout: { type: 'json', separator: ',' },
        level: ['error', 'fatal', 'warn'],
      });
    });
  }

  $beforeRoutesInit(): void {
    this.app
      .use(PlatformAcceptMimesMiddleware)
      .use(
        cors({
          origin: (origin, cb) => {
            if (process.env[APIConstants.ENV] === 'DEV') {
              cb(null, true);
            } else {
              if (process.env[APIConstants.DOMAIN_NAME] === origin) {
                cb(null, true);
              } else {
                cb(new Error('Not Allowed by CORS.'));
              }
            }
          },
        })
      )
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
  }
}
