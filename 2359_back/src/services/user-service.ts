import { userModel } from '../db/models/user-model';
import { userOptionService } from './userOption-service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IToUpdate {
  password: string;
  nickname: string;
}

interface IUserInfoRequired {
  userId: object;
  currentPassword: string;
}

class UserService {
  // 회원가입
  async addUser(userInfo: { email: string; password: string; nickname: string }) {
    const { email, password, nickname } = userInfo;

    // email 중복검사
    const user = await userModel.findByEmail(email);
    if (user) {
      throw new Error('이 이메일은 현재 사용중입니다.다른 이메일을 입력해 주세요.');
    }

    // password hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { email, password: hashedPassword, nickname };
    const createdNewUser = await userModel.create(newUserInfo);

    // userOption create
    const { _id } = createdNewUser;
    await userOptionService.create(_id); // TODO: 트랜잭션 처리

    return createdNewUser;
  }

  // 로그인
  async getUserToken(loginInfo: { email: string; password: string }) {
    const { email, password } = loginInfo;

    // email 회원여부 확인
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error('가입되지 않은 이메일 입니다.');
    }

    // password 일치 확인
    const passwordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);
    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다.다시 한번 확인해 주세요.');
    }
    // TODO: refresh Token 사용하기
    //jwt 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign({ userId: user._id, userEmail: user.email, nickname: user.nickname }, secretKey);

    return { token };
  }

  // 회원정보조회
  async getUserInfo(userId: object) {
    return await userModel.findById(userId);
  }

  // 회원정보수정
  async setUser(userInfoRequired: object, toUpdate: { password: string; nickname: string }) {
    const { userId, currentPassword } = userInfoRequired as IUserInfoRequired;

    let user = await userModel.findById(userId);
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(currentPassword, correctPasswordHash);

    if (!isPasswordCorrect) {
      throw new Error('현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
    }
    const { password, nickname } = toUpdate as IToUpdate;

    if (password) {
      const newPassWordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPassWordHash;
    }

    toUpdate.nickname = nickname;

    user = await userModel.update(userId, toUpdate);

    return user;
  }

  // 회원 탈퇴
  async deleteUser(userId: object) {
    // userOption 삭제
    await userOptionService.delete(userId);
    // user 삭제
    return userModel.delete(userId);
  }
}
const userService = new UserService();

export { userService };
