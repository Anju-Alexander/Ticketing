import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@anju102/common';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
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
app.use(currentUser);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);


// 404 handler
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler middleware
//app.use(errorHandler);
app.use(errorHandler as (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => void);


export {app};