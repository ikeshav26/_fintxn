import  express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { createAccount } from '../controller/account.controller.js';

const router = express.Router();


router.post('/create',auth,createAccount)

export default router;