import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js"
import accountRoutes from "./routes/account.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth',authRoutes)
app.use('/api/account',accountRoutes)
app.use('/api/transaction',transactionRoutes)

export default app;