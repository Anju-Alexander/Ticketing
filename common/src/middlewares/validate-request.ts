import { Request, Response, NextFunction } from 'express';
//import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const { validationResult } = require('express-validator');


export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
