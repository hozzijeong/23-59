import { Router, Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { questionService } from '../services/question-service';

const questionRouter = Router();

// 전체 질문 조회
questionRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

// 랜덤 질문
questionRouter.get('/random', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question = await questionService.randomQuestion();
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
});

// 질문 id로 조회
questionRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
});

// 질문 생성
questionRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const { item, tag } = req.body;
    const newQuestion = await questionService.addQuestion({
      item,
      tag,
    });

    res.status(200).json(newQuestion);
  } catch (error) {
    next(error);
  }
});

// 질문 수정
questionRouter.patch('/:questionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    const { questionId, item, tag } = req.body;

    const toUpdate = {
      ...(item && { item }),
      ...(tag && { tag }),
    };

    const updatedQuestion = await questionService.setQuestion(questionId, toUpdate);

    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
});

// 질문 id로 삭제
questionRouter.delete('/:questionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { questionId } = req.params;
    const deletedQuestion = await questionService.deleteQuestion(questionId);

    res.status(200).json(deletedQuestion);
  } catch (error) {
    next(error);
  }
});

export { questionRouter };
