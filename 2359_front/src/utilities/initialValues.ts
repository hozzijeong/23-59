import { AccountTableRow } from 'types/interfaces';
import { expenseEnums as EXPENSE, incomeEnums as INCOME, clsEnums as MONEY, emotionEnums } from 'types/enums';
import { getCurrentDate } from './getCurrentDate';

const INITIAL_TODAY_DIARY = {
  title: '',
  diaryContent: '',
};

const INITIAL_CONTENT_OPTIONS = {
  TODO_LIST: false,
  TODAY_QUESTION: false,
  EMOTION: false,
  DIARY: false,
  ACCOUNT_BOOK: false,
};

const QNA_INNITIAL = {
  question: '',
  tag: '',
  answer: '',
  _id: '',
};

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

export { INITIAL_DIARY_INFO, INITIAL_TODAY_DIARY, INITIAL_CONTENT_OPTIONS, INITIAL_ACCOUNT_INFO, QNA_INNITIAL };
