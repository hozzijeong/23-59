import { Router } from 'express';
//import is from '@sindresorhus/is';
import { check, validationResult } from 'express-validator';
import { contentService, questionService } from '../services';
import { loginRequired } from '../middlewares/login-required';
import { isEmpty } from '../middlewares/is-empty';

const contentRouter = Router();

// 전체 컨텐츠 조회
contentRouter.get('/', async (req, res, next) => {
  try {
    const contents = await contentService.getContents();

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});
// api/contents/calendar/:selectedDate
// 메인페이지 달력-날짜별(하루) 조회
contentRouter.get('/calendar/:selectedDate', loginRequired, async (req, res, next) => {
  try {
    const { selectedDate } = req.params;
    const authorId = req.currentUserId;
    const contents = await contentService.getCalendar(selectedDate, authorId.toString());

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});
// api/contents/monthCalendar/:date
// 메인페이지 달력-날짜별(한달) 조회
//loginRequired
contentRouter.get('/monthCalendar/:month', loginRequired, async (req, res, next) => {
  try {
    const { month } = req.params;
    const authorId = req.currentUserId;
    //console.log('authId', auth, typeof auth);
    //const author = req.params.author;
    const splitDate = month.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const contents = await contentService.getCalendarByMonth(splitDate[0], splitDate[1], authorId.toString());

    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
});

// 컨텐츠 id별 조회
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

// 컨텐츠 날짜별(하루) 조회
// api/contents/date/20221225
// loginRequired?
contentRouter.get('/date/:selectedDate', loginRequired, async (req, res, next) => {
  try {
    const { selectedDate } = req.params;
    const authorId = req.currentUserId;
    console.log('id ', authorId);
    const content = await contentService.getContentBySelectedDate(selectedDate, authorId.toString());
    if (!content) {
      res.status(400).json('Bad Request');
      return;
    }
    console.log('router ', content);
    res.status(200).json(content);
  } catch (error) {
    console.log('err ', error);
    //res.status(400).json('Bad Request');
    next(error);
  }
});

// 컨텐츠 날짜별(한달) 조회
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

// 컨텐츠 생성
//loginRequired
contentRouter.post('/', loginRequired, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    // diary, todo, account, answer
    const { selectedDate, emotion, diary, todo, account, qna, checkOption } = req.body;
    const answer = qna;
    const author = req.currentUserId;
    const dates = await contentService.checkDuplicate(author.toString());
    console.log('author ', author);
    for (let i = 0; i < dates.length; i++) {
      const dateArr = dates[i].selectedDate;
      //const authorArr = dates[i].author;
      if (dateArr.includes(selectedDate)) {
        // 날짜, 작성자 중복
        res.status(400).json('DB에 생성된 컨텐츠가 있습니다.');
        return;
      }
    }

    const newContent = await contentService.addContent(
      {
        selectedDate,
        author,
        emotion,
        diary,
        todo,
        account,
        checkOption,
      },
      answer
    );
    //console.log('qna ', qna);
    res.status(200).json(newContent);
  } catch (error) {
    next(error);
  }
});

// 컨텐츠 수정
//loginRequired
contentRouter.patch('/:contentId', loginRequired, async (req, res, next) => {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }
    const { contentId, emotion, diary, todo, account, qna, checkOption } = req.body;
    //const { contentId, selectedDate, answer } = req.body;
    console.log('contentId: ', contentId);

    const toUpdate = {
      ...(emotion && { emotion }),
      ...(diary && { diary }),
      ...(todo && { todo }),
      ...(account && { account }),
      ...(qna && { qna }),
      ...(checkOption && { checkOption }),
    };

    const updatedContent = await contentService.setContent(contentId, toUpdate);

    res.status(200).json(updatedContent);
  } catch (error) {
    next(error);
  }
});

// 컨텐츠 삭제
//loginRequired
contentRouter.delete('/:contentId', loginRequired, async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const deletedContent = await contentService.deleteContent(contentId);

    res.status(200).json(deletedContent);
  } catch (error) {
    next(error);
  }
});

// 감정 통계
// api/filterEmotion/20221201-20221231
//loginRequired
contentRouter.get('/filterEmotion/:date', loginRequired, async (req, res, next) => {
  try {
    const { date } = req.params;
    const authorId = req.currentUserId;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterEmotion(splitDate[0], splitDate[1], authorId.toString());
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

// 가계부 수입 합산
// api/filterCls/20221201-20221231
//loginRequired
contentRouter.get('/filterCls/:date', loginRequired, async (req, res, next) => {
  try {
    const { date } = req.params;
    const authorId = req.currentUserId;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterCls(splitDate[0], splitDate[1], authorId.toString());
    if (isEmpty(content)) {
      res.status(400).json('입력된 가계부 수입이 없습니다.');
    }
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

// 가계부 지출 카테고리별 통계
// api/contents/filterCategory/20221201-20221231
//loginRequired
contentRouter.get('/filterCategory/:date', loginRequired, async (req, res, next) => {
  try {
    const { date } = req.params;
    const authorId = req.currentUserId;
    const splitDate = date.split('-');
    console.log(`prev: ${splitDate[0]}, next: ${splitDate[1]}`);
    const content = await contentService.filterCategory(splitDate[0], splitDate[1], authorId.toString());
    console.log('router-content: ', content);
    //console.log('json-content: ', res.json(content));
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
});

// api/contents/qna
// 오늘의 질문 모아보기
//loginRequired
contentRouter.get('/filter/qna', loginRequired, async (req, res, next) => {
  try {
    const authorId = req.currentUserId;
    const qnas = await contentService.filterQna(authorId.toString());
    res.status(200).json(qnas);
  } catch (error) {
    next(error);
  }
});
// 미완...
contentRouter.get('/filter/tag', async (req, res, next) => {
  try {
    const tags = await contentService.filterTag();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
});

export { contentRouter };
