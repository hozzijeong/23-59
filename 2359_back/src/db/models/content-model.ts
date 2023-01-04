import { model } from 'mongoose';
import { ContentSchema } from '../schemas/content-schema';
// import {
//   emotionEnums as EMOTION,
//   incomeEnums as INCOMES,
//   expenseEnums as EXPENSES,
//   clsEnums as CLS,
// } from '../../../../2359_front/src/types/enums';

const Content = model('contents', ContentSchema);

// content CRUD
// findDate
// 통계: 감정, 가계부, 질문(전체보기, 태그별, 날짜별)

// default 작성 옵션 무엇?
// contentData 타입 아직 모름
// diary, todo, account, question 각각...?
const createContent = async (contentData: any) => {
  const newContent = await Content.create(contentData);
  return newContent;
};

const findAll = async () => {
  const contents = await Content.find({});
  return contents;
};

// 작성자, 날짜 중복 확인
const findDuplicate = async (authorId: string) => {
  const dates = await Content.find({ author: authorId }).select({ selectedDate: 1, author: 1 });
  //console.log('dates ', dates);
  return dates;
};

// update 타입 아직 모름
const updateContent = async ({ contentId, update }: { contentId: string; update: any }) => {
  const filter = { _id: contentId };
  const option = { returnOriginal: false };

  const updatedContent = await Content.findOneAndUpdate(filter, update, option);
  return updatedContent;
};

const deleteById = async (contentId: string) => {
  const deletedContent = await Content.findByIdAndDelete({ _id: contentId });
  return deletedContent;
};

const findById = async (id: string) => {
  const content = await Content.find({ _id: id });
  return content;
};

const findBySelectedDate = async (selectedDate: string, authorId: string) => {
  const content = await Content.find({ selectedDate, author: authorId });
  //console.log('content: ', content);
  //console.log('id ', authorId);
  //console.log('model ', content);
  return content;
};

const findByAuthor = async (author: string) => {
  const content = await Content.find({ author });
  return content;
};

// 해당 날짜내의 컨텐츠 조회
const filterByDate = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const filteredContents = await Content.find({ selectedDate: { $lte: next, $gte: prev }, author: authorId });
  //console.log('filteredContents: ', filteredContents);
  //console.log('length ', filteredContents.length);
  return filteredContents;
};

// 감정 통계
const filterByEmotion = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const emotions = ['VERY_BAD', 'BAD', 'SO_SO', 'GOOD', 'VERY_GOOD'];
  //const emotions = Object.keys(EMOTION);
  //console.log('EMOTION ', Object.keys(EMOTION));

  const filteredContents = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    emotion: { $in: emotions },
    author: authorId,
  });
  //const filteredContents = await Content.find({ selectedDate: { $lte: next, $gte: prev } }, { diary: { emotion: 1 } });
  // const e = filteredContents[1].diary;
  // console.log('model-emotions: ', e);
  console.log('model-emotions: ', filteredContents);
  return filteredContents;
};

// 가계부 수입/지출별 통계(합산)
const filterByCls = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const incomes = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': 'INCOME',
    author: authorId,
  });

  // const expenses = await Content.find({
  //   selectedDate: { $lte: next, $gte: prev },
  //   'account.cls': 'EXPENSE',
  // });

  // const accounts = await Content.find({
  //   selectedDate: { $lte: next, $gte: prev },
  //   account: { $in: ['수입', '지출'] },
  // });

  //console.log('model-incomes: ', incomes);
  // console.log('model-expenses: ', expenses);
  // console.log('models: ', { incomes, expenses });
  //console.log('model-accounts: ', accounts);
  return incomes;
};
// 가계부 카테고리별 통계
const filterByCategory = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const cateogries = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': 'EXPENSE',
    'account.category': { $exists: true },
    author: authorId,
  }).select({ selectedDate: 1, account: 1, author: 1 });
  //console.log('model-categories: ', cateogries);
  return cateogries;
};
// 모든 질문 전체보기
const findAllQna = async (authorId: string) => {
  const qnas = await Content.find({ 'qna.answer': { $exists: true }, author: authorId });
  //console.log('qnas ', qnas);
  return qnas;
};
// 질문 태그별 통계
const filterByTag = async () => {
  const tags = await Content.find({ 'qna.tag': { $exists: true } });
  //console.log('tags ', tags);
  return tags;
};
// 질문 날짜별 통계
//const filterByDate = async () => {};

export default {
  createContent,
  findAll,
  findDuplicate,
  updateContent,
  deleteById,
  findById,
  findBySelectedDate,
  findByAuthor,
  filterByDate,
  filterByEmotion,
  filterByCls,
  filterByCategory,
  findAllQna,
  filterByTag,
};
