import { model, Types } from 'mongoose';
import { userSchema, IUser } from '../schemas/user-schema';

const User = model<IUser>('users', userSchema);

export class UserModel {
  async create(userInfo: IUser) {
    return await User.create(userInfo);
  }

  async findById(userId: object) {
    return await User.findOne({ _id: userId });
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async update(userId: object, updateInfo: object) {
    return await User.findByIdAndUpdate({ _id: userId }, updateInfo, { returnOriginal: false });
  }

  async delete(userId: object) {
    return await User.findByIdAndDelete(userId);
  }
}

const userModel = new UserModel();

export { userModel };
