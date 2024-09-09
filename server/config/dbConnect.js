import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import config from 'config';

// const db = config.get('mongoURI');
// const db = "mongodb://127.0.0.1:27017/contact";
dotenv.config();
const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
