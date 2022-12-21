import { Schema, model, connect } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  nickname: string;
  firstLogin: boolean;
  createOption: object;
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
    firstLogin: {
      type: Boolean,
      default: true, // 최초로그인 시, ture 반환
    },
    createOption: {
      type: new Schema(
        {
          question: Boolean,
          todo: Boolean,
          diary: Boolean,
          account: Boolean,
        },
        {
          _id: false,
        }
      ),
      required: false,
      default: {
        question: false,
        todo: false,
        diary: false,
        account: false,
      },
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

// const User = model<IUser>('User', userSchema);

// run().catch((err) => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect('mongodb://localhost:27017/test');

//   const user = new User({
//     email: 'abc@cc.com',
//     password: 'abc123',
//     nickname: 'st',
//   });
//   await user.save();

//   console.log(user);
// }
