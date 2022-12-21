import { Router, Request, Response, NextFunction } from 'express';
import { loginRequired } from '../middlewares/login-required';
import { userOptionService } from '../services';

const userOptionRouter = Router();

// 유저옵션조회
userOptionRouter.get('/user/option', loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUserId;
    const userOptionInfo = await userOptionService.findById(userId);
    res.status(200).json(userOptionInfo);
  } catch (error) {
    next(error);
  }
});

// 유저옵션 수정
userOptionRouter.patch('/user/option', loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUserId;
    const { firstLogin, createOption } = req.body;

    const updateContent = {
      firstLogin,
      createOption,
    };

    const userOptionInfo = await userOptionService.update(userId, updateContent);
    res.status(201).json(userOptionInfo);
  } catch (error) {
    next(error);
  }
});

export { userOptionRouter };
