import { Inject, Injectable } from '@tsed/common';
import { ApiTypes } from '@crisboarna.com/types';
import { SESService } from './SESService';

@Injectable()
export class ContactService {
  @Inject()
  private sesClient: SESService;

  public async postContactRequest(payload: ApiTypes.ContactRequestPayload) {
    return this.sesClient.sendEmail(payload);
  }
}
