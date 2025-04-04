import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

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




app.listen(3000, () =>{

    console.log('Listening on port  3000!!!!');
});
