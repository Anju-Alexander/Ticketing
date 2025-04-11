import { CustomError } from './custom-error';
const { body, validationResult } = require('express-validator');

type ValidationErr = {
  msg: string;
  param: string;
  location: string;
  value?: any;
  type?: string;
  path?: string; // some versions use `path` instead of `param`
};

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationErr[]) {
    super('Invalid Request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors?.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.param || error.path };
      }
      return { message: '' };
    });
  }
}
