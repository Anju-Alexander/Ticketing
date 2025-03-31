import express from 'express';
//import { currentUser } from '../middlewares/current-user';
//import { requireAuth } from '../middlewares/require-auth';


const router = express.Router();

router.get('/api/users/currentuser', (req,res)=>{
    res.send('Hi currentuser');
});



export {router as currentUser};