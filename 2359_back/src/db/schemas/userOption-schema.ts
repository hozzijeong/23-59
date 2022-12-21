import { Schema } from 'mongoose';

interface IUserOption {
  user: object;
  firstLogin: boolean;
  createOption: ICreateOption;
}

interface ICreateOption {
  TODO_LIST: boolean;
  TODAY_QUESTION: boolean;
  DIARY: boolean;
  EMOTION: boolean;
  ACCOUNT_BOOK: boolean;
}

const userOptionSchema = new Schema<IUserOption>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  firstLogin: {
    type: Boolean,
    default: true, // 최초로그인 시, ture 반환
  },
  createOption: {
    type: new Schema(
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
    ),
    default: {
      TODO_LIST: false,
      TODAY_QUESTION: false,
      DIARY: false,
      EMOTION: false,
      ACCOUNT_BOOK: false,
    },
  },
});

export { userOptionSchema, IUserOption, ICreateOption };
