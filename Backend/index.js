import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';

import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

const app = express();
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.VERCEL_MongoDBURI;
app.use(cors({
  origin: process.env.VERCEL_FRONTEND_URL ? process.env.VERCEL_FRONTEND_URL : "*"
}));

console.log("FRont end  URI:", process.env.VERCEL_FRONTEND_URL);
app.options('*', cors());

app.get('/ping', (req, res) => { 
  res.send('Backend Server response');
})

//connect to mongoDB
try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}

// defining routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})