import express from 'express';
// eslint-disable-next-line import/extensions
//import mongoose from 'mongoose';
import connectDB from './DB/index';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.get('/welcome', (req, res) => {
  res.send('welcome!');
});

app.listen(PORT, () => {
  console.log('server connected...');
});
