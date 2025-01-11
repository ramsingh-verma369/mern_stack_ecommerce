import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';


// import files
import connectDB from './config/data.js';
import authRoutes from './routes/auth.route.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.post('/api/v1/auth',authRoutes)
app.get('/', (req, res) => {
  res.send("<h1>Hello World! This is my mern stack ecommerce website</h1>");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.DEV_MODE} on port ${PORT}`);
});