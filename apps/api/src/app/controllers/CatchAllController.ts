import * as crypto from 'crypto';
import { Controller } from '@tsed/di';
import { All, Description, Returns, Summary } from '@tsed/schema';
import { Context } from '@tsed/platform-params';
import { NotFoundModel } from '../models';
import { APIConstants } from '@crisboarna.com/common-api';

@Controller('/*')
export class CatchAllController {
  @All('')
  @Summary('Generic catch all controller')
  @Description(
    'This endpoint provides the generic catch all functionality for unknown endpoints.'
  )
  @Returns(200, NotFoundModel).ContentType('json')
  public catchAll(@Context() ctx: Context): NotFoundModel {
    return {
      errorId: crypto.randomUUID(),
      errorCode: 404,
      message: 'Invalid url',
      field: 'path',
      originalValue: ctx.request.url,
      helpUrl: `https://swagger.${process.env[APIConstants.DOMAIN_NAME]}`,
    };
  }
}
