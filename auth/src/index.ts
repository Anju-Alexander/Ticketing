import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';

import { currentUser } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupUser } from './routes/signup';
import {errorHandler} from  './middlewares/error-handler'
import {NotFoundError } from './errors/not-found-error';


const app = express();
app.use(json());

app.use(currentUser);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupUser);

app.all('*',async(req,res,next)=>{
    throw new NotFoundError();
});
app.use(errorHandler);


const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to mongo db');
    }
    catch(err)
    {
        console.error(err);
    }
}

app.listen(3000, () =>{

    console.log('Hello Listening on port 3000!!!');
});

start();
