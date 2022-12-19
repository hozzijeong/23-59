import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';

interface IContent {
  selectedDate: string;
  month: string;
  //author: ObjectId;
  author: string;
  diary: object;
  todo: object;
  account: object;
  answer: object;
}

interface IDiary {
  emotion: string;
  title: string;
  diaryContent: string;
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
  answer: string;
  tag: string;
}

const diarySchema = new Schema<IDiary>(
  {
    emotion: String,
    title: String,
    diaryContent: String,
  },
  {
    _id: false,
  }
);

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
  },
  amount: {
    type: Number,
  },
});

const answerSchema = new Schema<IAnswer>({
  // question: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'questions',
  // },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  tag: {
    type: String,
  },
});

const ContentSchema = new Schema<IContent>(
  {
    selectedDate: {
      type: String,
      required: true,
    },
    // month: {
    //   type: String,
    //   required: true,
    // },
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'users',
    //   required: true,
    // },
    author: {
      type: String,
    },
    diary: {
      type: diarySchema,
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

export { ContentSchema };

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
