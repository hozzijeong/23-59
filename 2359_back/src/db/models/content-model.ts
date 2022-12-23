import { model } from 'mongoose';
import { ContentSchema } from '../schemas/content-schema';
import {
  emotionEnums as EMOTION,
  incomeEnums as INCOMES,
  expenseEnums as EXPENSES,
  clsEnums as CLS,
} from '../../../../2359_front/src/types/enums';
// D:\2359\initialization\2359_back\src\db\models\content-model.ts
// D:\2359\initialization\2359_front\src\types\enums.ts
// initialization\2359_front\src\types\enums.ts
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

const findBySelectedDate = async (selectedDate: string) => {
  const content = await Content.find({ selectedDate });
  //console.log('content: ', content);
  return content;
};

const findByAuthor = async (author: string) => {
  const content = await Content.find({ author });
  return content;
};

// 해당 날짜내의 컨텐츠 조회
const filterByDate = async (prevDate: string, nextDate: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const filteredContents = await Content.find({ selectedDate: { $lte: next, $gte: prev } });
  //console.log('filteredContents: ', filteredContents);
  //console.log('length ', filteredContents.length);
  return filteredContents;
};

// 감정 통계
const filterByEmotion = async (prevDate: string, nextDate: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  //const emotions = ['very sad', 'sad', 'soso', 'happy', 'very happy'];
  const emotions = Object.keys(EMOTION);
  console.log('EMOTION ', Object.keys(EMOTION));

  const filteredContents = await Content.find({ selectedDate: { $lte: next, $gte: prev }, emotion: { $in: emotions } });
  //const filteredContents = await Content.find({ selectedDate: { $lte: next, $gte: prev } }, { diary: { emotion: 1 } });
  // const e = filteredContents[1].diary;
  // console.log('model-emotions: ', e);
  console.log('model-emotions: ', filteredContents);
  return filteredContents;
};

// 가계부 수입/지출별 통계(합산)
const filterByCls = async (prevDate: string, nextDate: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const clsArr = Object.keys(CLS);
  console.log('clsArr ', clsArr); //  [ 'EXPENSE', 'INCOME' ]
  console.log(clsArr[1]);
  const incomes = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': '수입',
  });

  const expenses = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': 'EXPENSE',
  });

  // const accounts = await Content.find({
  //   selectedDate: { $lte: next, $gte: prev },
  //   account: { $in: ['수입', '지출'] },
  // });

  console.log('model-incomes: ', incomes);
  console.log('model-expenses: ', expenses);
  console.log('models: ', { incomes, expenses });
  //console.log('model-accounts: ', accounts);
  return incomes;
};
// 가계부 카테고리별 통계
const filterByCategory = async (prevDate: string, nextDate: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const cateogries = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': '지출',
    'account.category': { $exists: true },
  });
  console.log('model-categories: ', cateogries);
  return cateogries;
};
// 모든 질문 전체보기
const findAllQuestions = async () => {};
// 질문 태그별 통계
const filterByTag = async () => {};
// 질문 날짜별 통계
//const filterByDate = async () => {};

export default {
  createContent,
  findAll,
  updateContent,
  deleteById,
  findById,
  findBySelectedDate,
  findByAuthor,
  filterByDate,
  filterByEmotion,
  filterByCls,
  filterByCategory,
};
