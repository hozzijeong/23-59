import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './db/index';
import { errorHandler } from './middlewares/error-handler';
import { userRouter, userOptionRouter, contentRouter, questionRouter } from './routers';

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api/user', userRouter);
app.use('/api/user', userOptionRouter);
app.use('/api/contents', contentRouter);
app.use('/api/questions', questionRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
