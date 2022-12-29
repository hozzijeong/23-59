import { AccountTableRow, DiaryBodyProps, DiaryProps, OptionCheckedProps } from 'types/interfaces';
import { expense as EXPENSE, cls as MONEY } from 'types/enums';
import { getCurrentDate } from 'utilities/date';

const INITIAL_TODAY_DIARY: DiaryProps = {
  title: '',
  diaryContent: '',
};

const INITIAL_CONTENT_OPTIONS: OptionCheckedProps = {
  TODO_LIST: false,
  TODAY_QUESTION: false,
  EMOTION: false,
  DIARY: false,
  ACCOUNT_BOOK: false,
};

const QNA_INNITIAL = {
  question: '',
  answer: '',
  questionId: '',
};

// POST -> questionId, answer, (req)
// UPDATE -> questionId, answer (req)
// GET -> questionId, answer, question(res) // /api/contents/date/:selectedDate re s{ qna : {}}

const INITIAL_DIARY_INFO = {
  _id: '',
  selectedDate: '',
  todo: [],
  qna: QNA_INNITIAL,
  emotion: null,
  diary: INITIAL_TODAY_DIARY,
  account: [],
  checkOption: INITIAL_CONTENT_OPTIONS,
};

const INITIAL_ACCOUNT_INFO: AccountTableRow = {
  id: getCurrentDate(),
  cls: MONEY.EXPENSE,
  category: EXPENSE.FOOD,
  amount: '',
  memo: '',
};

const INITIAL_BODY: DiaryBodyProps = {
  selectedDate: '',
  emotion: null,
  diary: INITIAL_TODAY_DIARY,
  qna: {
    questionId: '',
    answer: '',
  },
  todo: [],
  account: [],
  checkOption: INITIAL_CONTENT_OPTIONS,
};

export {
  INITIAL_DIARY_INFO,
  INITIAL_TODAY_DIARY,
  INITIAL_CONTENT_OPTIONS,
  INITIAL_ACCOUNT_INFO,
  QNA_INNITIAL,
  INITIAL_BODY,
};
