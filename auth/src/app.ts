import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUser } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupUser } from './routes/signup';
import { errorHandler, NotFoundError } from '@anju102/common';
//import { NotFoundError } from './errors/not-found-error';

const app = express();

// Enable cookies over proxies (if using ingress, nginx, etc.)
app.set('trust proxy', true);

// Parse incoming JSON
app.use(json());

// Use cookie-session for JWT storage
app.use(
  cookieSession({
    signed: false, // JWTs are already secure
    secure: process.env.NODE_ENV !== 'test', // only HTTPS in prod, if it is test environment set it as false, else https is true
  })
);

// Routes
app.use(currentUser);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupUser);

// 404 handler
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(errorHandler);

export {app};