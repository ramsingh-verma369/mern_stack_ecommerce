import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/data.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send("<h1>Hello World! This is my mern stack ecommerce website</h1>");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.DEV_MODE} on port ${PORT}`);
});