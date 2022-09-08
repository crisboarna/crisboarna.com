import { Controller } from '@tsed/di';
import { Description, Post, Returns, Summary } from '@tsed/schema';
import { BodyParams } from '@tsed/platform-params';
import { Inject } from '@tsed/common';
import { ContactService } from '../services/ContactService';
import { ContactRequestModel } from '../models';

@Controller('/contact')
export class ContactController {
  @Inject()
  contactService: ContactService;

  @Post('/')
  @Summary('Submits a contact form payload')
  @Description(
    'This endpoint provides the backend for the contact form submit action sending the request to my email.'
  )
  @Returns(200).ContentType('json')
  @Returns(400).ContentType('json')
  @Returns(500).ContentType('json')
  public async postContactRequest(
    @BodyParams(ContactRequestModel) payload: ContactRequestModel
  ) {
    return this.contactService.postContactRequest(payload);
  }
}
