import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@anju102/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import {indexTicketRouter} from './routes/index';
import {updateTicketRouter} from './routes/update'
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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


// 404 handler
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler middleware
//app.use(errorHandler);
app.use(errorHandler as (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => void);


export {app};