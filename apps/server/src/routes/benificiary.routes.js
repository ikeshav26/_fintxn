import express from 'express';
import { addBenificary, deleteBenificary, getBenificaries } from '../controller/benificiary.controller.js';
import {auth} from '../middlewares/auth.middleware.js';

const router=express.Router()


router.post('/add',auth,addBenificary);
router.get('/get',auth,getBenificaries)
router.delete('/delete/:id',auth,deleteBenificary);


export default router;