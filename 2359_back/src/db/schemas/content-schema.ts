import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';

interface IContent {
  _id: Schema.Types.ObjectId;
  selectedDate: string;
  month: string;
  //author: ObjectId;
  author: string;
  emotion: string;
  diary: object;
  todo: object;
  account: object;
  qna: object;
}

interface IDiary {
  title: string;
  diaryContent: string;
}

interface ITodo {
  id: string;
  done: boolean;
  item: string;
}

interface IAccount {
  cls: string;
  category: string;
  amount: number;
  memo: string;
}

interface IQnA {
  question: object;
  answer: string;
  tag: string;
}

const diarySchema = new Schema<IDiary>(
  {
    title: String,
    diaryContent: String,
  },
  {
    _id: false,
  }
);

const todoSchema = new Schema<ITodo>(
  {
    id: String,
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
  memo: {
    type: String,
  },
});

const qnaSchema = new Schema<IQnA>({
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
    emotion: {
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
    qna: {
      type: qnaSchema,
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
