import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
//import connectDB from './DB/index';
import { contentRouter } from './routers/content-router';

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

// app.get('/welcome', (req, res) => {
//   res.send('welcome!');
// });

app.use('/api/contents', contentRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

export { app };

// import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';

// interface IContent {
//   date: string;
//   month: string;
//   author: ObjectId;
//   diary: object;
//   todo: object;
//   account: object;
//   answer: object;
// }

// interface ITodo {
//   done: boolean;
//   item: string;
// }

// interface IAccount {
//   cls: string;
//   category: string;
//   amount: number;
// }

// interface IAnswer {
//   question: object;
//   tag: string;
//   item: string;
// }

// const todoSchema = new Schema<ITodo>(
//   {
//     done: Boolean,
//     item: String,
//   },
//   {
//     _id: false,
//   }
// );

// const accountSchema = new Schema<IAccount>(
//   {
//     cls: {
//       type: String,
//       enum: ['수입', '지출'],
//     },
//     category: {
//       type: String,
//       enum: ['식비', '생활', '건강', '월급'],
//     },
//     amount: {
//       type: Number,
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const answerSchema = new Schema<IAnswer>({
//   question: {
//     type: String,
//     // type: Schema.Types.ObjectId,
//     // ref: 'questions',
//   },
//   tag: {
//     type: String,
//   },
//   item: {
//     type: String,
//   },
// });

// const contentSchema = new Schema<IContent>(
//   {
//     date: {
//       type: String,
//       required: true,
//     },
//     month: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       // type: Schema.Types.ObjectId,
//       // ref: 'users',
//       required: true,
//     },
//     diary: {
//       type: new Schema(
//         {
//           emotion: String,
//           title: String,
//           diaryContent: String,
//         },
//         {
//           _id: false,
//         }
//       ),
//     },
//     todo: {
//       type: [todoSchema],
//     },
//     account: {
//       type: [accountSchema],
//     },
//     answer: {
//       type: answerSchema,
//     },
//   },
//   {
//     collection: 'contents',
//     timestamps: true,
//   }
// );

// const Content = model<IContent>('User', contentSchema);

// run().catch((err) => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect('mongodb://localhost:27017/test');

//   const content = new Content({
//     date: '20221225',
//     month: '202212',
//     author: '60ff324f41c4d5b96054390d',
//     diary: {
//       emotion: 'sad',
//       title: 'hi',
//       diaryContent: 'goodmoning',
//     },
//     todo: [
//       {
//         done: true,
//         item: '테스트하기',
//       },
//       {
//         done: false,
//         item: '운동하기',
//       },
//     ],
//     account: [
//       {
//         cls: '수입',
//         category: '월급',
//         amount: 10000,
//       },
//       {
//         cls: '지출',
//         category: '식비',
//         amount: 3000,
//       },
//     ],
//     answer: {
//       question: '60ff324f41c4d5b96054390d',
//       tag: '음악',
//       item: '캐롤 들을래',
//     },
//   });
//   await content.save();

//   console.log(content);
// }
