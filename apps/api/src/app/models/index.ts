import {
  Description,
  Email,
  MinLength,
  Property,
  Required,
} from '@tsed/schema';
import { ApiTypes } from '@crisboarna.com/types';

export class NotFoundModel implements ApiTypes.NotFoundResponse {
  @Property()
  @Required()
  @Description('The order Id.')
  readonly errorCode: number;

  @Property()
  @Required()
  @Description('The order Id.')
  readonly errorId: string;

  @Property()
  @Required()
  @Description('The order Id.')
  readonly field: string;

  @Property()
  @Required()
  @Description('The order Id.')
  readonly helpUrl: string;

  @Property()
  @Required()
  @Description('The order Id.')
  readonly message: string;

  @Property()
  @Required()
  @Description('The order Id.')
  readonly originalValue: string;
}

export class ContactRequestModel implements ApiTypes.ContactRequestPayload {
  @Property()
  @Required()
  @Description('The order Id.')
  @MinLength(2)
  readonly name: string;

  @Property()
  @Required()
  @Description('The order Id.')
  @Email()
  readonly email: string;

  @Property()
  @Required()
  @Description('The order Id.')
  @MinLength(5)
  readonly subject: string;

  @Property()
  @Required()
  @Description('The order Id.')
  @MinLength(10)
  readonly message: string;
}
