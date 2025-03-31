import express from 'express';
import {json} from 'body-parser';

// import { currentUser } from './routes/currentUser';
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';
//import { signupUser } from './routes/signup';



const app = express();
app.use(json());

app.get('/api/users/currentuser', (req,res)=>{

    res.send("Hi there!");
});

// app.use(currentUser);
// app.use(signinRouter);
// app.use(signoutRouter);
//app.use(signupUser);


app.listen(3000, () =>{

    console.log('Listening on port 3000!!');
});
