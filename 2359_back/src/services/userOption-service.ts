import { Types } from 'mongoose';
import { userOptionModel } from '../db/models/userOption-model';

class UserOptionService {
  async create(userId: object) {
    return await userOptionModel.create(userId);
  }

  async findById(userId: object) {
    return await userOptionModel.findById(userId);
  }

  async update(userId: object, updateContent: object) {
    return await userOptionModel.update(userId, updateContent);
  }

  async delete(userId: object) {
    return await userOptionModel.delete(userId);
  }
}

const userOptionService = new UserOptionService();

export { userOptionService };
