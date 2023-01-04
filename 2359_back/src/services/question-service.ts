import questionModel from '../db/models/question-model';
import { ObjectId } from 'mongoose';
import { isEmpty } from '../middlewares/is-empty';

class QuestionService {
  questionModel;

  constructor(questionModel: any) {
    this.questionModel = questionModel;
  }

  // 질문 생성
  async addQuestion(data: any) {
    const newQuestion = await this.questionModel.createQuestion(data);

    return newQuestion;
  }

  // 전체 질문 조회
  async getQuestions() {
    const questions = await this.questionModel.findQuestions();
    //const questionArr = questions.map((obj: any) => obj.item);
    return questions;
  }

  // id로 질문 조회
  async getQuestionById(id: string) {
    const question = await this.questionModel.findQuestionById(id);
    if (!question) {
      console.log('해당 id의 질문이 없습니다.');
    }
    // console.log('id', id);
    // console.log('q ', question);
    // if (isEmpty(question)) {
    //   return 0;
    // }
    //const filtered = question.map((obj: any) => obj.item);
    //console.log('filtered ', filtered[0]);
    //return question[0].item;
    return question;
  }

  // 질문 수정
  async setQuestion(questionId: string, toUpdate: any) {
    const updatedQuestion = await this.questionModel.updateQuestion({
      questionId,
      update: toUpdate,
    });

    return updatedQuestion;
  }

  // 질문 삭제
  async deleteQuestion(questionId: string) {
    const { deletedQuestion }: any | null = await this.questionModel.deleteById(questionId);

    if (deletedQuestion === 0) {
      throw new Error(`${questionId} 컨텐츠 삭제에 실패했습니다.`);
    }

    return { result: 'success' };
  }

  // 랜덤 질문
  async randomQuestion() {
    const questions = await this.questionModel.findQuestions();
    //console.log('item ', questions);
    const random = questions[Math.floor(Math.random() * questions.length)];
    return random;
  }

  // 랜덤 질문
  // async randomQuestionId() {
  //   const questions = await this.questionModel.findQuestions();
  //   //console.log('item ', questions);
  //   const questionArr = questions.map((obj: any) => obj);
  //   console.log('questionArr: ', questionArr);
  //   const random = questionArr[Math.floor(Math.random() * questionArr.length)];
  //   console.log('random ', random);
  //   return random;
  // }
}

const questionService = new QuestionService(questionModel);

export { questionService };
