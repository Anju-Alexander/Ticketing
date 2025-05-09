import mongoose from 'mongoose';
import { app } from './app';


// Connect to Mongo and start the server
const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT Key must be defined');
    }
    if(!process.env.MONGO_URI){
      throw new Error('MONGO_URI Key must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Auth MongoDB!!');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
  });
};

start();
