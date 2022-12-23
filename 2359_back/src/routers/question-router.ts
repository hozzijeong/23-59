import { Router } from 'express';
//import is from '@sindresorhus/is';
import { check, validationResult } from 'express-validator';

import { questionService } from '../services/question-service';

const questionRouter = Router();

// /api/questions
questionRouter.get('/all', async (req, res, next) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});
questionRouter.get('/random', async (req, res, next) => {
  try {
    const question = await questionService.randomQuestion();
    console.log('q ', question);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
});
// api/questions/63a026bb13e614f3a952659f
questionRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
});

questionRouter.post('/', async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    // diary, todo, account, answer
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

questionRouter.patch('/:questionId', async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    const { questionId, item, tag } = req.body;
    console.log('questionId: ', questionId);

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

questionRouter.delete('/:questionId', async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const deletedQuestion = await questionService.deleteQuestion(questionId);

    res.status(200).json(deletedQuestion);
  } catch (error) {
    next(error);
  }
});

export { questionRouter };
