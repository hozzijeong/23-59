import contentModel from '../db/models/content-model';
import mongoose from 'mongoose';
import { questionService } from './question-service';
import { isEmpty } from '../middlewares/is-empty';

class ContentService {
  contentModel;

  constructor(contentModel: any) {
    this.contentModel = contentModel;
  }

  // 날짜 중복 체크
  async checkDuplicate(authorId: string) {
    const dates = await this.contentModel.findDuplicate(authorId);
    const dateArr = dates.map((obj: any) => obj.selectedDate);
    const authorArr = dates.map((obj: any) => obj.author);
    //console.log('dateArr', dateArr.sort());
    //console.log('authorArr', authorArr);
    //console.log('dates ', dates.selectedDate);
    return dates;
  }

  // 컨텐츠 생성
  async addContent(contentData: any, answerData: any) {
    const { selectedDate, author, emotion, diary, todo, account, checkOption } = contentData;
    console.log('answerData ', answerData);
    const questionId = answerData?.questionId;
    const answer = answerData?.answer;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      //throw new Error('zzzz');
      console.log('질문 작성 안함');
      const result = {
        selectedDate,
        author,
        emotion,
        diary,
        todo,
        account,
        checkOption,
      };
      //console.log('result ', result);
      const newContent = await this.contentModel.createContent(result);

      newContent.checkOption.TODO_LIST = !isEmpty(newContent.todo);
      newContent.checkOption.TODAY_QUESTION = !isEmpty(newContent.qna?.answer);
      newContent.checkOption.DIARY = !isEmpty(newContent.diary);
      newContent.checkOption.EMOTION = !isEmpty(newContent.emotion);
      newContent.checkOption.ACCOUNT_BOOK = !isEmpty(newContent.account);
      //console.log('checkOption ', newContent.checkOption);
      return newContent;
    }
    //console.log('answerData ', answerData);
    const questionData = await questionService.getQuestionById(questionId);
    //console.log('qdata ', questionData);
    if (isEmpty(questionData)) {
      console.log('qdata ', questionData[0]);
      questionData[0] = '';
    }
    const { item, tag } = questionData[0];
    const question = item;
    const qna = { questionId, question, tag, answer };

    const result = {
      selectedDate,
      author,
      emotion,
      diary,
      todo,
      account,
      qna,
      checkOption,
    };
    console.log('result ', result);
    const newContent = await this.contentModel.createContent(result);

    newContent.checkOption.TODO_LIST = !isEmpty(newContent.todo);
    newContent.checkOption.TODAY_QUESTION = !isEmpty(newContent.qna?.answer);
    newContent.checkOption.DIARY = !isEmpty(newContent.diary);
    newContent.checkOption.EMOTION = !isEmpty(newContent.emotion);
    newContent.checkOption.ACCOUNT_BOOK = !isEmpty(newContent.account);
    //console.log('checkOption ', newContent.checkOption);
    return newContent;
  }

  // 전체 컨텐츠 조회
  async getContents() {
    const contents = await this.contentModel.findAll();
    return contents;
  }

  // id로 컨텐츠 조회
  async getContentById(id: string) {
    const content = await this.contentModel.findById(id);
    if (!content) {
      console.log('해당 id의 컨텐츠가 없습니다.');
    }
    return content;
  }

  // 날짜로 컨텐츠 조회
  async getContentBySelectedDate(selectedDate: string, authorId: string) {
    const content = await this.contentModel.findBySelectedDate(selectedDate, authorId);
    if (!content) {
      console.log('해당 날짜의 컨텐츠가 없습니다.');
    }
    // content.checkOption.TODO_LIST = !isEmpty(content.todo);
    // content.checkOption.TODAY_QUESTION = !isEmpty(content.qna.answer);
    // content.checkOption.DIARY = !isEmpty(content.diary);
    // content.checkOption.EMOTION = !isEmpty(content.emotion);
    // content.checkOption.ACCOUNT_BOOK = !isEmpty(content.account);
    if (!isEmpty(content.checkOption)) {
      content.checkOption.TODO_LIST = !isEmpty(content.todo);
      content.checkOption.TODAY_QUESTION = !isEmpty(content.qna.answer);
      content.checkOption.DIARY = !isEmpty(content.diary);
      content.checkOption.EMOTION = !isEmpty(content.emotion);
      content.checkOption.ACCOUNT_BOOK = !isEmpty(content.account);
    }
    //console.log('service ', content);
    return content;
  }

  // 컨텐츠 변경
  async setContent(contentId: string, toUpdate: any) {
    //console.log('toUpdate.qna ', toUpdate.qna);
    const questionId = toUpdate.qna?.questionId;
    const answer = toUpdate.qna?.answer;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const updatedContent = await this.contentModel.updateContent({
        contentId,
        update: toUpdate,
      });

      updatedContent.checkOption.TODO_LIST = !isEmpty(updatedContent.todo);
      updatedContent.checkOption.TODAY_QUESTION = !isEmpty(updatedContent.qna.answer);
      updatedContent.checkOption.DIARY = !isEmpty(updatedContent.diary);
      updatedContent.checkOption.EMOTION = !isEmpty(updatedContent.emotion);
      updatedContent.checkOption.ACCOUNT_BOOK = !isEmpty(updatedContent.account);
      //console.log('updated checkoption ', updatedContent.checkOption);

      return updatedContent;
    }
    const questionData = await questionService.getQuestionById(questionId);
    if (isEmpty(questionData)) {
      questionData[0] = '';
    }
    const { item, tag } = questionData[0];
    const question = item;
    toUpdate.qna = { questionId, question, tag, answer };
    //qnaData = qna;
    //console.log('cscs ', qnaData);
    const updatedContent = await this.contentModel.updateContent({
      contentId,
      update: toUpdate,
    });

    updatedContent.checkOption.TODO_LIST = !isEmpty(updatedContent.todo);
    updatedContent.checkOption.TODAY_QUESTION = !isEmpty(updatedContent.qna.answer);
    updatedContent.checkOption.DIARY = !isEmpty(updatedContent.diary);
    updatedContent.checkOption.EMOTION = !isEmpty(updatedContent.emotion);
    updatedContent.checkOption.ACCOUNT_BOOK = !isEmpty(updatedContent.account);
    //console.log('updated checkoption ', updatedContent.checkOption);

    return updatedContent;
  }

  // 컨텐츠 삭제
  async deleteContent(contentId: string) {
    const { deletedContent }: any | null = await this.contentModel.deleteById(contentId);

    if (deletedContent === 0) {
      throw new Error(`${contentId} 컨텐츠 삭제에 실패했습니다.`);
    }

    return { result: 'success' };
  }

  // 해당 날짜내의 컨텐츠 조회
  async filterDate(prevDate: string, nextDate: string) {
    const contents = await this.contentModel.filterByDate(prevDate, nextDate);
    if (!contents) {
      console.log('해당 날짜내의 컨텐츠가 없습니다.');
    }
    //console.log('contents: ', contents);
    return contents;
  }

  async getCalendar(selectedDate: string, authorId: string) {
    const content = await this.contentModel.findBySelectedDate(selectedDate, authorId);
    if (!content) {
      console.log('해당 날짜의 컨텐츠가 없습니다.');
    }
    const emotionArr = content.map((obj: any) => obj.emotion);
    let etcBool = false;
    if (content.map((obj: any) => obj.todo) === undefined) {
      etcBool = false;
    } else if (content.map((obj: any) => obj.diary) === undefined) {
      etcBool = false;
    } else if (content.map((obj: any) => obj.qna) === undefined) {
      etcBool = false;
    } else {
      etcBool = true;
    }
    const accounts = content.map((obj: any) => obj.account);
    //console.log('accounts: ', accounts);

    const clsArr = [];
    const amountArr = [];
    if (!isEmpty(accounts[0])) {
      for (let i = 0; i < accounts[0].length; i++) {
        if (accounts[0][i] === undefined) {
          continue;
        }
        clsArr.push(accounts[0][i].cls);
        amountArr.push(accounts[0][i].amount);
      }
    }
    //console.log('clsArr ', clsArr);
    //console.log('amountArr ', amountArr);

    const map = new Map();
    //console.log('map: ', map);

    for (let i = 0; i < clsArr.length; i++) {
      map.set(clsArr[i], (map.get(clsArr[i]) ?? 0) + amountArr[i]);
    }
    const account = Object.fromEntries(map);
    //console.log('account ', account);

    const result = { date: selectedDate, emotion: emotionArr[0], etc: etcBool, account };
    //.log('result: ', result);
    return result;
  }

  // 한달용
  async getCalendarByMonth(prevDate: string, nextDate: string, authorId: string) {
    // const authorContent = await this.contentModel.findByAuthor(author);
    // console.log('authorContent', authorContent);
    const content = await this.contentModel.filterByDate(prevDate, nextDate, authorId);
    if (!content) {
      console.log('해당 날짜의 컨텐츠가 없습니다.');
    }
    const dateArr = content.map((obj: any) => obj.selectedDate);
    //console.log('dateArr ', dateArr[1]);

    //const result = this.getCalendar(dateArr[1]);
    const result = [];
    for (let i = 0; i < dateArr.length; i++) {
      result.push(this.getCalendar(dateArr[i], authorId));
    }
    //result.push(await this.getCalendar(dateArr[i]));
    const result2 = Promise.all(result);
    //console.log('result2 ', result2);
    return result2;
  }

  // 감정 통계
  async filterEmotion(prevDate: string, nextDate: string, authorId: string) {
    const emotions = await this.contentModel.filterByEmotion(prevDate, nextDate, authorId);
    if (!emotions) {
      console.log('저장된 감정표시가 없습니다.');
    }
    const filtered = emotions.map((obj: any) => obj.emotion);
    //console.log('filtered: ', filtered);
    //const e = filteredEmotions.map((obj: any) => obj.diary);
    // const emotionsArr = [];
    // for (let i = 0; i < filtered.length; i++) {
    //   if (filtered[i] === undefined) {
    //     continue;
    //   }
    //   emotionsArr.push(filtered[i].emotion);
    // }
    const emotionArr = ['VERY_BAD', 'BAD', 'SO_SO', 'GOOD', 'VERY_GOOD'];
    //const emotionArr = Object.keys(EMOTION);
    const diff = emotionArr.filter((x: string) => !filtered.includes(x));
    //console.log('diff  ', diff);
    // function checkAvailability(arr: any, val: any) {
    //   return arr.some((arrVal: any) => val === arrVal);
    // }
    //const arr: any = [];
    const filteredEmotions = filtered.reduce((a: any, i: number) => {
      //console.log(`a`, a);
      return (a[i] = (a[i] || 0) + 1), a;
    }, {});
    for (let x = 0; x < diff.length; x++) {
      filteredEmotions[diff[x]] = 0;
    }
    //console.log('filteredEmotions: ', filteredEmotions);
    return filteredEmotions;
  }

  // 가계부 수입 합산
  async filterCls(prevDate: string, nextDate: string, authorId: string) {
    const cls = await this.contentModel.filterByCls(prevDate, nextDate, authorId);
    if (!cls) {
      console.log('저장된 가계부가 없습니다.');
    }
    const filtered = cls.map((obj: any) => obj.account);
    //const filtered2 = cls.filter((obj: any) => obj.amount, []);
    const amounts = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i][0] === undefined) {
        continue;
      }
      amounts.push(filtered[i][0].amount);
    }
    //console.log('filtered: ', filtered, filtered.length);
    //console.log('amounts: ', amounts);
    //console.log('filtered: ', filtered[0][0].amount, filtered[1][0].amount);
    const amount = amounts.reduce((sum, curr) => sum + curr);
    //console.log('amount: ', amount);
    return amount;
  }

  // 가계부 지출 카테고리별 통계
  async filterCategory(prevDate: string, nextDate: string, authorId: string) {
    const category = await this.contentModel.filterByCategory(prevDate, nextDate, authorId);
    if (!category) {
      console.log('저장된 가계부가 없습니다.');
    }
    const filtered = category.map((obj: any) => obj.account);
    //console.log('filtered: ', filtered);
    //console.log('filtered: ', filtered[0]);
    const categories: any = [];
    const amounts: any = [];

    for (let i = 0; i < filtered.length; i++) {
      for (let j = 0; j < filtered[i].length; j++) {
        if (filtered[i][j].cls === 'EXPENSE') {
          categories.push(filtered[i][j].category);
          amounts.push(filtered[i][j].amount);
        }
      }
    }
    //console.log('categories: ', categories);
    //console.log('amounts: ', amounts);

    const map = new Map();

    for (let i = 0; i < categories.length; i++) {
      map.set(categories[i], Number((map.get(categories[i]) ?? 0) + amounts[i]));
      //map.set(categories[i], map.get(categories[i]) + amounts[i]);
    }
    //console.log('map: ', map);
    const result = Object.fromEntries(map);
    //console.log('result ', result);

    return result;
  }

  // 작성된 질문 모아보기
  async filterQna(authorId: string) {
    const qnas = await this.contentModel.findAllQna(authorId);
    const filteredQna = qnas.map((obj: any) => obj.qna);
    const filteredDate = qnas.map((obj: any) => obj.selectedDate);
    //console.log('filteredQna ', filteredQna[4]);
    //console.log('filteredDate ', filteredDate);

    let result: any = [];
    for (let i = 0; i < filteredDate.length; i++) {
      //filteredQna[i].selectedDate = filteredDate[i];
      //console.log('s ', filteredQna[i].selectedDate);
      result.push({
        selectedDate: filteredDate[i],
        qna: {
          question: filteredQna[i].question,
          answer: filteredQna[i].answer,
          tag: filteredQna[i].tag,
          _id: filteredQna[i]._id,
        },
      });
    }
    //console.log('q ', filteredQna[4].question);
    //console.log('result ', result);
    return result;
  }

  // 태그별 질문 모아보기
  async filterTag() {
    const tags = await this.contentModel.filterByTag();
    const filtered = tags.map((obj: any) => obj.qna);
    // const tagArr = [];
    // for (let i = 0; i < filtered.length; i++) {
    //   if (filtered[i] === undefined) {
    //     continue;
    //   }
    //   tagArr.push(filtered.map((obj: any) => obj.tag));
    // }
    const filteredTag = filtered.map((obj: any) => obj.tag);
    //console.log('length ', filtered.length);
    console.log('filtered ', filtered);
    console.log('filteredTag ', filteredTag);
    return filtered;
  }
}

const contentService = new ContentService(contentModel);

export { contentService };
