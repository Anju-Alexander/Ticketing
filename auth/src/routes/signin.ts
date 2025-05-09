import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
//import { body, validationResult } from "express-validator";
import { validateRequest, BadRequestError } from '@anju102/common';

import { User } from "../models/user";
import { Password } from "../service/password";
//import { BadRequestError } from "../errors/bad-request-error";

const { body, validationResult } = require('express-validator');

//const {body} = require('express-validator')
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ], validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){
      throw new BadRequestError('Invalid Credentials');
    }
    const passwordMatch = await Password.compare(existingUser.password,password);
    if(!passwordMatch)
    {
      throw new BadRequestError('Invalid Credentials');
    }

     const userJwt = jwt.sign({
          id: existingUser.id,
          email: existingUser.email
        }, process.env.JWT_KEY!
      );
    
         // Store it on session object
         req.session = {
          jwt: userJwt
        };
        
        
        res.status(201).send(existingUser);    

  }

  
);

export { router as signinRouter };
