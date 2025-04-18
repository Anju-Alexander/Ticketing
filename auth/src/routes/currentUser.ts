import express from 'express';
import { currentUser, requireAuth } from '@anju102/common';
//import { requireAuth } from '../middlewares/require-auth';

//import { currentUser } from '../middlewares/current-user';
//import { requireAuth } from '../middlewares/require-auth';


const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth,(req,res)=>{
 
    res.send({currentUser: req.currentUser ||null });
});



export {router as currentUser};