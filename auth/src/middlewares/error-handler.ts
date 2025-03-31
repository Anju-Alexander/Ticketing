import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    res.status(err.statusCode).send({errors: err.serializeErrors()});
    return;
  }
  if (err instanceof DatabaseConnectionError) {
    res.status(err.statusCode).send({errors: err.serializeErrors()});
    return; // Ensure that the function exits after sending the response
  }

  res.status(400).send({
    message: err.message,
  });
};
