import mongoose, { Schema } from 'mongoose';
import contentModel from '../db/models/content-model';
import { questionService } from './question-service';
import { isEmpty } from '../middlewares/is-empty';
//import { IContentData } from '../db/schemas/content-schema';

class ContentService {
  contentModel;

  constructor(contentModel: any) {
    this.contentModel = contentModel;
  }

  // 날짜 중복 체크
  async checkDuplicate(authorId: string) {
    const dates = await this.contentModel.findDuplicate(authorId);
    return dates;
  }

  // 컨텐츠 생성
  async addContent(contentData: any, answerData: any) {
    const { selectedDate, author, emotion, diary, todo, account, checkOption } = contentData;
    const questionId = answerData?.questionId;
    const answer = answerData?.answer;
    // 질문 답변 작성 안함
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      const result = {
        selectedDate,
        author,
        emotion,
        diary,
        todo,
        account,
        checkOption,
      };
      const newContent = await this.contentModel.createContent(result);

      newContent.checkOption.TODO_LIST = !isEmpty(newContent.todo);
      newContent.checkOption.TODAY_QUESTION = !isEmpty(newContent.qna?.answer);
      newContent.checkOption.DIARY = !isEmpty(newContent.diary);
      newContent.checkOption.EMOTION = !isEmpty(newContent.emotion);
      newContent.checkOption.ACCOUNT_BOOK = !isEmpty(newContent.account);
      return newContent;
    }
    const questionData = await questionService.getQuestionById(questionId);
    if (isEmpty(questionData)) {
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
    const newContent = await this.contentModel.createContent(result);

    newContent.checkOption.TODO_LIST = !isEmpty(newContent.todo);
    newContent.checkOption.TODAY_QUESTION = !isEmpty(newContent.qna?.answer);
    newContent.checkOption.DIARY = !isEmpty(newContent.diary);
    newContent.checkOption.EMOTION = !isEmpty(newContent.emotion);
    newContent.checkOption.ACCOUNT_BOOK = !isEmpty(newContent.account);
    console.log('service-create ', newContent);
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
      throw new Error('해당 id의 컨텐츠가 없습니다.');
    }
    return content;
  }

  // 날짜로 컨텐츠 조회
  async getContentBySelectedDate(selectedDate: string, authorId: string) {
    const content = await this.contentModel.findBySelectedDate(selectedDate, authorId);
    if (!content) {
      throw new Error('해당 날짜에 컨텐츠가 없습니다.');
    }

    if (!isEmpty(content.checkOption)) {
      content.checkOption.TODO_LIST = !isEmpty(content.todo);
      content.checkOption.TODAY_QUESTION = !isEmpty(content.qna.answer);
      content.checkOption.DIARY = !isEmpty(content.diary);
      content.checkOption.EMOTION = !isEmpty(content.emotion);
      content.checkOption.ACCOUNT_BOOK = !isEmpty(content.account);
    }
    return content;
  }

  // 컨텐츠 변경
  async setContent(contentId: string, toUpdate: any) {
    const questionId = toUpdate.qna?.questionId;
    const answer = toUpdate.qna?.answer;
    // 질문 답변 작성 안함
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
      console.log('service-qX ', updatedContent);
      return updatedContent;
    }

    const questionData = await questionService.getQuestionById(questionId);
    // if (isEmpty(questionData)) {
    //   questionData[0] = IQuestion;
    // }

    const { item, tag } = questionData[0];
    const question = item;
    toUpdate.qna = { questionId, question, tag, answer };
    const updatedContent = await this.contentModel.updateContent({
      contentId,
      update: toUpdate,
    });

    updatedContent.checkOption.TODO_LIST = !isEmpty(updatedContent.todo);
    updatedContent.checkOption.TODAY_QUESTION = !isEmpty(updatedContent.qna.answer);
    updatedContent.checkOption.DIARY = !isEmpty(updatedContent.diary);
    updatedContent.checkOption.EMOTION = !isEmpty(updatedContent.emotion);
    updatedContent.checkOption.ACCOUNT_BOOK = !isEmpty(updatedContent.account);
    console.log('service ', updatedContent);
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
      throw new Error('해당 날짜내의 컨텐츠가 없습니다.');
    }
    return contents;
  }

  async getCalendar(selectedDate: string, authorId: string) {
    const content = await this.contentModel.findBySelectedDate(selectedDate, authorId);
    if (!content) {
      throw new Error('해당 날짜의 컨텐츠가 없습니다.');
    }
    const emotionArr = content.map((obj: any) => obj.emotion);
    let etcBool = false;
    if (!content[0].checkOption.TODO_LIST && !content[0].checkOption.DIARY && !content[0].checkOption.TODAY_QUESTION) {
      etcBool = false;
    } else {
      etcBool = true;
    }

    const accounts = content.map((obj: any) => obj.account);

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

    const map = new Map();

    for (let i = 0; i < clsArr.length; i++) {
      map.set(clsArr[i], (map.get(clsArr[i]) ?? 0) + amountArr[i]);
    }
    const account = Object.fromEntries(map);
    const result = { date: selectedDate, emotion: emotionArr[0], etc: etcBool, account };

    return result;
  }

  // 한달용
  async getCalendarByMonth(prevDate: string, nextDate: string, authorId: string) {
    const content = await this.contentModel.filterByDate(prevDate, nextDate, authorId);
    if (!content) {
      console.log('해당 날짜의 컨텐츠가 없습니다.');
    }
    const dateArr = content.map((obj: any) => obj.selectedDate);
    const result = [];
    for (let i = 0; i < dateArr.length; i++) {
      result.push(this.getCalendar(dateArr[i], authorId));
    }
    const result2 = Promise.all(result);
    return result2;
  }

  // 감정 통계
  async filterEmotion(prevDate: string, nextDate: string, authorId: string) {
    const emotions = await this.contentModel.filterByEmotion(prevDate, nextDate, authorId);
    if (!emotions) {
      console.log('저장된 감정표시가 없습니다.');
    }
    const emotionArr = ['VERY_BAD', 'BAD', 'SO_SO', 'GOOD', 'VERY_GOOD'];
    const filtered = emotions.map((obj: any) => obj.emotion);
    const diff = emotionArr.filter((x: string) => !filtered.includes(x));
    const filteredEmotions = filtered.reduce((a: any, i: number) => {
      return (a[i] = (a[i] || 0) + 1), a;
    }, {});
    for (let x = 0; x < diff.length; x++) {
      filteredEmotions[diff[x]] = 0;
    }
    return filteredEmotions;
  }

  // 가계부 수입 합산
  async filterCls(prevDate: string, nextDate: string, authorId: string) {
    const cls = await this.contentModel.filterByCls(prevDate, nextDate, authorId);
    if (!cls) {
      console.log('저장된 가계부가 없습니다.');
    }
    const filtered = cls.map((obj: any) => obj.account);
    const amounts = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i][0] === undefined) {
        continue;
      }
      amounts.push(filtered[i][0].amount);
    }
    const amount = amounts.reduce((sum, curr) => sum + curr);
    return amount;
  }

  // 가계부 지출 카테고리별 통계
  async filterCategory(prevDate: string, nextDate: string, authorId: string) {
    const category = await this.contentModel.filterByCategory(prevDate, nextDate, authorId);
    if (!category) {
      console.log('저장된 가계부가 없습니다.');
    }
    const filtered = category.map((obj: any) => obj.account);
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
    const map = new Map();

    for (let i = 0; i < categories.length; i++) {
      map.set(categories[i], Number((map.get(categories[i]) ?? 0) + amounts[i]));
    }
    const result = Object.fromEntries(map);

    return result;
  }

  // 작성된 질문 모아보기
  async filterQna(authorId: string) {
    const qnas = await this.contentModel.findAllQna(authorId);
    const filteredQna = qnas.map((obj: any) => obj.qna);
    const filteredDate = qnas.map((obj: any) => obj.selectedDate);

    const result: any = [];
    for (let i = 0; i < filteredDate.length; i++) {
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
    return result;
  }

  // 태그별 질문 모아보기
  async filterTag() {
    const tags = await this.contentModel.filterByTag();
    const filtered = tags.map((obj: any) => obj.qna);
    const filteredTag = filtered.map((obj: any) => obj.tag);
    console.log('filtered ', filtered);
    console.log('filteredTag ', filteredTag);
    return filtered;
  }
}

const contentService = new ContentService(contentModel);

export { contentService };
