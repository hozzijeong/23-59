import { model, Types } from 'mongoose';
import { userOptionSchema, IUserOption } from '../schemas/userOption-schema';

const UserOption = model<IUserOption>('useroptions', userOptionSchema);

export class UserOptionModel {
  async create(userId: object) {
    return await UserOption.create({ user: userId });
  }
  async findById(userId: object) {
    return await UserOption.findOne({ user: userId });
  }
  async update(userId: object, updateContent: object) {
    return await UserOption.findOneAndUpdate({ user: userId }, updateContent, { returnOriginal: false });
  }
  async delete(userId: object) {
    return await UserOption.findOneAndDelete({ user: userId });
  }
}

const userOptionModel = new UserOptionModel();

export { userOptionModel };
