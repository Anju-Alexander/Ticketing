import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ], async (req: Request,res: Response)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array());

    }

    const {email, password } = req.body;

   console.log('creating a user...');
   throw new DatabaseConnectionError();
   res.send({});
   
});



export {router as signupUser};