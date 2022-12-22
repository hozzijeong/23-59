import { Router } from 'express';
//import is from '@sindresorhus/is';
import { check, validationResult } from 'express-validator';

import { contentService } from '../services/content-service';

const contentRouter = Router();

contentRouter.get('/', async (req, res, next) => {
  try {
    const contents = await contentService.getContents();

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});
// api/contents/calendar/:selectedDate
contentRouter.get('/calendar/:selectedDate', async (req, res, next) => {
  try {
    const { selectedDate } = req.params;
    const contents = await contentService.getCalendar(selectedDate);

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});
// api/contents/monthCalendar/:date
contentRouter.get('/monthCalendar/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const contents = await contentService.getCalendarByMonth(splitDate[0], splitDate[1]);

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});
// api/contents/63a026bb13e614f3a952659f
contentRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await contentService.getContentById(id);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});
// api/contents/date/20221225
contentRouter.get('/date/:selectedDate', async (req, res, next) => {
  try {
    const { selectedDate } = req.params;
    const content = await contentService.getContentBySelectedDate(selectedDate);
    res.status(200).json(content);
  } catch (error) {
    console.log('err ', error);
    res.status(400).json('Bad Request');
    next(error);
  }
});
// api/contents/20221201-20221231
contentRouter.get('/filterDate/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterDate(splitDate[0], splitDate[1]);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

contentRouter.post('/', async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    // diary, todo, account, answer
    const { selectedDate, emotion, diary, todo, account, qna } = req.body;

    const newContent = await contentService.addContent({
      selectedDate,
      emotion,
      diary,
      todo,
      account,
      qna,
    });

    res.status(200).json(newContent);
  } catch (error) {
    next(error);
  }
});

contentRouter.patch('/:contentId', async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    const { contentId, diary, todo, account, answer } = req.body;
    //const { contentId, selectedDate, answer } = req.body;
    console.log('contentId: ', contentId);

    // const toUpdate = {
    //   ...(selectedDate && { selectedDate }),
    //   ...(answer && { answer }),
    // };

    const toUpdate = {
      ...(diary && { diary }),
      ...(todo && { todo }),
      ...(account && { account }),
      ...(answer && { answer }),
    };

    const updatedContent = await contentService.setContent(contentId, toUpdate);

    res.status(200).json(updatedContent);
  } catch (error) {
    next(error);
  }
});

contentRouter.delete('/:contentId', async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const deletedContent = await contentService.deleteContent(contentId);

    res.status(200).json(deletedContent);
  } catch (error) {
    next(error);
  }
});

// api/filterEmotion/20221201-20221231
contentRouter.get('/filterEmotion/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterEmotion(splitDate[0], splitDate[1]);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

// api/filterCls/20221201-20221231
contentRouter.get('/filterCls/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterCls(splitDate[0], splitDate[1]);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

// api/filterCategory/20221201-20221231
contentRouter.get('/filterCategory/:date', async (req, res, next) => {
  try {
    const { date } = req.params;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterCategory(splitDate[0], splitDate[1]);
    console.log('router-content: ', content);
    //console.log('json-content: ', res.json(content));
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

export { contentRouter };
