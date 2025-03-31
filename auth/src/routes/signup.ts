import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ], (req: Request,res: Response)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send(errors.array());
        return;

    }

    const {email, password } = req.body;

   console.log('creating a user...');
   res.send({});
   
});



export {router as signupUser};