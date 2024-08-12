export interface NotFoundResponse {
  readonly errorId: string;
  readonly errorCode: number;
  readonly message: string;
  readonly field: string;
  readonly originalValue: string;
  readonly helpUrl: string;
}

export interface ContactRequestPayload {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}
