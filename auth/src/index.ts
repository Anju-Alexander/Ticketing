import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUser } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupUser } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// Enable cookies over proxies (if using ingress, nginx, etc.)
app.set('trust proxy', true);

// Parse incoming JSON
app.use(json());

// Use cookie-session for JWT storage
app.use(
  cookieSession({
    signed: false, // JWTs are already secure
    secure: process.env.NODE_ENV !== 'test', // only HTTPS in prod
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


// Connect to Mongo and start the server
const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT Key must be defined');
    }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000 🚀');
  });
};

start();
