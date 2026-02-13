import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/DB.js';


dotenv.config();

const app = express();
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;