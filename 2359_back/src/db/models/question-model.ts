import { model } from 'mongoose';
import { QuestionSchema } from '../schemas/question-schema';

const Question = model('questions', QuestionSchema);

const createQuestion = async (data: any) => {
  const newQuestion = await Question.create(data);
  return newQuestion;
};

const findQuestions = async () => {
  const questions = await Question.find({});
  return questions;
};

// update 타입 아직 모름
const updateQuestion = async ({ questionId, update }: { questionId: string; update: any }) => {
  const filter = { _id: questionId };
  const option = { returnOriginal: false };

  const updatedQuestion = await Question.findOneAndUpdate(filter, update, option);
  return updatedQuestion;
};

const deleteById = async (questionId: string) => {
  const deletedQuestion = await Question.findByIdAndDelete({ _id: questionId });
  return deletedQuestion;
};

const findById = async (id: string) => {
  const question = await Question.find({ _id: id });
  return question;
};

export default { createQuestion, findQuestions, updateQuestion, deleteById, findById };
