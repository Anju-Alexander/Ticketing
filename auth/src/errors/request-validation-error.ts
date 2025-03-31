import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode=400;
  constructor(public errors: ValidationError[]) {
    super('Invalid Request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors?.map((error: any) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }
      return {message: ''}; // Return null if the error type is not 'field'
    }).filter((error: any) => error !== null);
  }
  
}


// const formattedErrors = err.errors?.map((error: any) => {
//   if (error.type === 'field') {
//     return { message: error.msg, field: error.path };
//   }
//   return null; // Return null if the error type is not 'field'
// }).filter((error: any) => error !== null); // Filter out null values

// // Send the formatted errors response
// res.status(400).send({ errors: formattedErrors });