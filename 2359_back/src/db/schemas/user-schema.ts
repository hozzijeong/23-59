import { Schema } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  nickname: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { userSchema, IUser };
