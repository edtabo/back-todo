import { Injectable } from '@nestjs/common';
import { errorMessages, successMessages } from './commons';

@Injectable()
export class Localizations {
  private readonly errorMessages: typeof errorMessages;
  private readonly successMessages: typeof successMessages;

  constructor() {
    this.errorMessages = errorMessages;
    this.successMessages = successMessages;
  }

  getErrorMessages() {
    return this.errorMessages;
  }

  getSuccessMessages() {
    return this.successMessages;
  }
}
