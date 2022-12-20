import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';

interface IContent {
  createDate: Date;
  yearMonth: string;
  author: ObjectId;
  diary: object;
  todo: object;
  account: object;
  answer: object;
}

interface ITodo {
  done: boolean;
  item: string;
}

interface IAccount {
  cls: string;
  category: string;
  amount: number;
}

interface IAnswer {
  question: object;
  tag: string;
  item: string;
}

const todoSchema = new Schema<ITodo>(
  {
    done: Boolean,
    item: String,
  },
  {
    _id: false,
  }
);

const accountSchema = new Schema<IAccount>({
  cls: {
    type: String,
    enum: ['수입', '지출'],
  },
  category: {
    type: String,
    enum: ['식비', '생활', '건강'],
  },
  amount: {
    type: Number,
  },
});

const answerSchema = new Schema<IAnswer>({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
  },
  tag: {
    type: String,
  },
  item: {
    type: String,
  },
});

const contentSchema = new Schema<IContent>(
  {
    createDate: {
      type: Date,
      required: true,
    },
    yearMonth: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    diary: {
      type: new Schema(
        {
          emotion: String,
          title: String,
          diaryContent: String,
        },
        {
          _id: false,
        }
      ),
    },
    todo: {
      type: [todoSchema],
    },
    account: {
      type: [accountSchema],
    },
    answer: {
      type: answerSchema,
    },
  },
  {
    collection: 'contents',
    timestamps: true,
  }
);

// const Content = model<IContent>('User', contentSchema);

// run().catch((err) => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect('mongodb://localhost:27017/test');

//   const content = new Content({
//     email: 'abc@cc.com',
//     password: 'abc123',
//     nickname: 'st',
//   });
//   await content.save();

//   console.log(content);
// }
