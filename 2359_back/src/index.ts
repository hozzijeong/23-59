import 'dotenv/config';
import cors from 'cors';
import express, { application } from 'express';
import mongoose from 'mongoose';
//import connectDB from './db/index';
import { userRouter, userOptionRouter, contentRouter, questionRouter } from './routers';
//import { contentRouter } from './routers/content-router';
const connectDB = () => {
  const DB_URL = process.env.MONGODB_URL || 'MongoDB 서버 주소가 설정되지 않았습니다.';
  const db = mongoose.connection;
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL);

    db.on('connected', () => console.log(`정상적으로 MongoDB 서버에 연결되었습니다. ${DB_URL}`));
  } catch (error) {
    db.on('error', () => console.log(`\nMongoDB 연결에 실패하였습니다.\n${DB_URL}\n${error}`));
  }
};
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api', userRouter);
app.use('/api', userOptionRouter);
app.use('/api/contents', contentRouter);
app.use('/api/questions', questionRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
