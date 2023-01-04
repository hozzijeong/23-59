import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { loginRequired } from '../middlewares/login-required';

const userRouter = Router();

// 회원가입
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, nickname, passwordConfirm } = req.body;

    // 패스워드 확인
    if (password !== passwordConfirm) {
      throw new Error('입력하신 비밀번호가 같지 않습니다. 다시 입력해 주세요.');
    }

    const newUser = await userService.addUser({
      email,
      password,
      nickname,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userToken = await userService.getUserToken({ email, password });
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

// 유저정보조회 (유저정보수정 & mypage??)
userRouter.get('/info', loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  const userOid = req.currentUserId;
  const user = await userService.getUserInfo(userOid);
  res.status(200).json(user);
});

// 회원정보수정
userRouter.patch('/info', loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUserId;
    const { password, nickname } = req.body;

    const currentPassword = req.body.currentPassword;
    if (!currentPassword) {
      throw new Error('정보를 변경하려면,현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };
    const toUpdate = {
      ...(nickname && { nickname }),
      ...(password && { password }),
    };

    const updatedUSerInfo = await userService.setUser(userInfoRequired, toUpdate);

    res.status(200).json(updatedUSerInfo);
  } catch (error) {
    next(error);
  }
});

// 회원탈퇴
userRouter.delete('/delete', loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userOid = req.currentUserId;
    const userDelete = await userService.deleteUser(userOid);
    res.json(userDelete);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
