import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendRegisterationEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'fintech <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Fin_Txn!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to Fin_Txn</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #007BFF;
              color: #ffffff;           text-decoration: none;
                border-radius: 4px; 
            }
            .button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Fin_Txn!</h1>
                <p>Thank you for registering with Fin_Txn. We're excited to have you on board!</p>
                <p>With Fin_Txn, you can easily manage your financial transactions and stay on top of your finances.</p>
                <a href="https://fin-txn.vercel.app/" class="button">Get Started</a>
            </div>
        </body>
        </html>`,
    });

    if (error) {
      console.log('Error in sending mail', error);
      return false;
    }

    console.log('Email sent:', data.id);
    return true;
  } catch (err) {
    console.log('Error in sending mail', err);
    return false;
  }
};


export const sendTransactionSuccesfulMail = async (userEmail,username,amount,toAccount) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'fintech <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Transaction Successful!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Transaction Successful</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #555555;
            }
          </style>
        </head>
        <body>
            <div class="container">
                <h1>Transaction Successful!</h1>
                <p>Dear ${username},</p>
                <p>Your transaction of amount ${amount} to account ${toAccount} has been completed successfully.</p>
                <p>Thank you for using Fin_Txn!</p>
            </div>
        </body>
        </html>`,
    });

    if (error) {
      console.log('Error in sending mail', error);
      return false;
    }

    console.log('Email sent:', data.id);
    return true;
  } catch (err) {
    console.log('Error in sending mail', err);
    return false;
  }
};