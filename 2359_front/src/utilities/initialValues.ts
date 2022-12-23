import { emotionEnums } from 'types/enums';

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

const INITIAL_DIARY_INFO = {
  _id: '',
  selectedDate: '',
  todo: [],
  questionAnswer: '',
  emotion: emotionEnums.SO_SO,
  diary: INITIAL_TODAY_DIARY,
  account: [],
  contentOptions: INITIAL_CONTENT_OPTIONS,
};

export { INITIAL_DIARY_INFO, INITIAL_TODAY_DIARY, INITIAL_CONTENT_OPTIONS };
