import { Injectable } from '@tsed/common';
import { SESV2, config } from 'aws-sdk';
import { APIConstants } from '@crisboarna.com/common-api';
import { ApiTypes } from '@crisboarna.com/types';
import { $log } from '@tsed/logger';

@Injectable()
export class SESService {
  private ses: SESV2;

  constructor() {
    this.ses = new SESV2({ region: process.env[APIConstants.REGION] });
  }

  public async sendEmail(
    request: ApiTypes.ContactRequestPayload
  ): Promise<boolean> {
    const payload = {
      Destination: {
        ToAddresses: [process.env[APIConstants.SES_EMAIL_NAME]],
      },
      ReplyToAddresses: [request.email],
      FromEmailAddress: process.env[APIConstants.SES_EMAIL_NAME],
      Content: {
        Simple: {
          Subject: {
            Charset: 'UTF-8',
            Data: request.subject,
          },
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: request.message,
            },
          },
        },
      },
    };

    try {
      const outcome = await this.ses.sendEmail(payload).promise();
      $log.debug(outcome);
      return outcome.$response.error != undefined;
    } catch (e) {
      $log.error(e);
      return false;
    }
  }
}
