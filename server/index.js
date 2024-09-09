import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/dbConnect.js';
import usersRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import contactRoute from './routes/contact.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Db Connection
// connectDB();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Define Routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/contacts', contactRoute);

const PORT = process.env.PORT || 5030;
const CONNECTION_URL = process.env.mongoURI;
// const CONNECTION_URL = process.env.mongoURI;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on : ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

// app.listen(PORT, () => console.log(`server started at ${PORT}`));
