import { model } from 'mongoose';
import { QuestionSchema } from '../schemas/question-schema';

const Question = model('questions', QuestionSchema);

// 질문 생성
const createQuestion = async (data: any) => {
  const newQuestion = await Question.create(data);
  return newQuestion;
};

// 모든 질문 조회
const findQuestions = async () => {
  const questions = await Question.find({}).select({ _id: 1, item: 1 });
  return questions;
};

// 질문 id로 조회
const findQuestionById = async (id: string) => {
  const questions = await Question.find({ _id: id });
  return questions;
};

// 질문 수정
const updateQuestion = async ({ questionId, update }: { questionId: string; update: any }) => {
  const filter = { _id: questionId };
  const option = { returnOriginal: false };

  const updatedQuestion = await Question.findOneAndUpdate(filter, update, option);
  return updatedQuestion;
};

// 질문 삭제
const deleteById = async (questionId: string) => {
  const deletedQuestion = await Question.findByIdAndDelete({ _id: questionId });
  return deletedQuestion;
};

export default { createQuestion, findQuestions, findQuestionById, updateQuestion, deleteById };
