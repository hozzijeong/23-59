import { model } from 'mongoose';
import { ContentSchema } from '../schemas/content-schema';

const Content = model('contents', ContentSchema);

// 컨텐츠 생성
const createContent = async (contentData: any) => {
  const newContent = await Content.create(contentData);
  console.log('model-create ', contentData);
  return newContent;
};

// db에 모든 컨텐츠 조회
const findAll = async () => {
  const contents = await Content.find({});
  return contents;
};

// 작성자, 날짜 중복 확인
const findDuplicate = async (authorId: string) => {
  const dates = await Content.find({ author: authorId }).select({ selectedDate: 1, author: 1 });
  return dates;
};

// 컨텐츠 수정
const updateContent = async ({ contentId, update }: { contentId: string; update: any }) => {
  const filter = { _id: contentId };
  const option = { returnOriginal: false };

  const updatedContent = await Content.findOneAndUpdate(filter, update, option);
  console.log('model ', updatedContent);
  return updatedContent;
};

// 컨텐츠 id로 삭제
const deleteById = async (contentId: string) => {
  const deletedContent = await Content.findByIdAndDelete({ _id: contentId });
  return deletedContent;
};

// 컨텐츠 id로 조회
const findById = async (id: string) => {
  const content = await Content.find({ _id: id });
  return content;
};

// 지정날짜로 컨텐츠 조회
const findBySelectedDate = async (selectedDate: string, authorId: string) => {
  const content = await Content.find({ selectedDate, author: authorId });
  return content;
};

// 작성자로 컨텐츠 조회
const findByAuthor = async (author: string) => {
  const content = await Content.find({ author });
  return content;
};

// 해당 날짜내의 컨텐츠 조회
const filterByDate = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const filteredContents = await Content.find({ selectedDate: { $lte: next, $gte: prev }, author: authorId });
  return filteredContents;
};

// 감정 통계
const filterByEmotion = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const emotions = ['VERY_BAD', 'BAD', 'SO_SO', 'GOOD', 'VERY_GOOD'];

  const filteredContents = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    emotion: { $in: emotions },
    author: authorId,
  });

  return filteredContents;
};

// 가계부 수입(합산)
const filterByCls = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const incomes = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': 'INCOME',
    author: authorId,
  });

  return incomes;
};

// 가계부 지출 카테고리별 통계
const filterByCategory = async (prevDate: string, nextDate: string, authorId: string) => {
  const prev = parseInt(prevDate, 10);
  const next = parseInt(nextDate, 10);

  const cateogries = await Content.find({
    selectedDate: { $lte: next, $gte: prev },
    'account.cls': 'EXPENSE',
    'account.category': { $exists: true },
    author: authorId,
  }).select({ selectedDate: 1, account: 1, author: 1 });

  return cateogries;
};

// 모든 질문 모아보기
const findAllQna = async (authorId: string) => {
  const qnas = await Content.find({ 'qna.answer': { $exists: true }, author: authorId });
  return qnas;
};

// 질문 태그별 통계
const filterByTag = async () => {
  const tags = await Content.find({ 'qna.tag': { $exists: true } });
  return tags;
};

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
