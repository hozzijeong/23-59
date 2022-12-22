import 'dotenv/config';
import cors from 'cors';
import express, { application } from 'express';
import connectDB from './DB/index';
import { userRouter, userOptionRouter, contentRouter, questionRouter } from './routers';
//import { contentRouter } from './routers/content-router';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', userRouter);
app.use('/api', userOptionRouter);
app.use('/api/contents', contentRouter);
app.use('/api/questions', questionRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
