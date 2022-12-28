import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';

interface IContent {
  _id: Schema.Types.ObjectId;
  selectedDate: string;
  month: string;
  //author: ObjectId;
  author: Schema.Types.ObjectId;
  emotion: string;
  diary: object;
  todo: object;
  account: object;
  qna: object;
  checkOption: object;
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
  questionId: object;
  question: string;
  answer: string;
  tag: string;
}

interface ICheckOption {
  TODO_LIST: boolean;
  TODAY_QUESTION: boolean;
  DIARY: boolean;
  EMOTION: boolean;
  ACCOUNT_BOOK: boolean;
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
    enum: ['EXPENSE', 'INCOME'],
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
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
  },
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

const checkOpotionSchema = new Schema<ICheckOption>(
  {
    TODO_LIST: Boolean,
    TODAY_QUESTION: Boolean,
    DIARY: Boolean,
    EMOTION: Boolean,
    ACCOUNT_BOOK: Boolean,
  },
  {
    _id: false,
  }
);

const ContentSchema = new Schema<IContent>(
  {
    selectedDate: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
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
    checkOption: {
      type: checkOpotionSchema,
      default: {
        TODO_LIST: false,
        TODAY_QUESTION: false,
        DIARY: false,
        EMOTION: false,
        ACCOUNT_BOOK: false,
      },
    },
  },
  {
    collection: 'contents',
    timestamps: true,
  }
);

export { ContentSchema };
