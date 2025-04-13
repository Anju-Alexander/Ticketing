//import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

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
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
