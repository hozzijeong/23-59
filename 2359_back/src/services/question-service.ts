import { Schema } from 'mongoose';
import questionModel from '../db/models/question-model';
import { isEmpty } from '../middlewares/is-empty';

class QuestionService {
  questionModel;

  constructor(questionModel: any) {
    this.questionModel = questionModel;
  }

  // 질문 생성
  async addQuestion(data: { item: string; tag: string }) {
    const newQuestion = await this.questionModel.createQuestion(data);
    return newQuestion;
  }

  // 전체 질문 조회
  async getQuestions() {
    const questions = await this.questionModel.findQuestions();
    return questions;
  }

  // id로 질문 조회
  async getQuestionById(id: string) {
    const question = await this.questionModel.findQuestionById(id);
    if (!question) {
      throw new Error('해당 id의 질문을 찾을 수 없습니다.');
    }
    return question;
  }

  // 질문 수정
  async setQuestion(questionId: string, toUpdate: { item: string; tag: string }) {
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
    const random = questions[Math.floor(Math.random() * questions.length)];
    return random;
  }
}

const questionService = new QuestionService(questionModel);

export { questionService };
