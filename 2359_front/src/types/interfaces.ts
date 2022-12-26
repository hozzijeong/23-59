import {
  expenseEnums as EXPENSE,
  incomeEnums as INCOME,
  emotionEnums as EMOTION,
  clsEnums,
  OptionEnums as OPTIONS,
  DiaryMode,
} from 'types/enums';

interface AccountTableRow {
  id: string;
  cls: clsEnums;
  category: EXPENSE | INCOME;
  amount: number;
  memo: string;
}

interface TodoListProps {
  id: string;
  done: boolean;
  item: string;
}

interface DiaryProps {
  title: string;
  diaryContent: string;
}

interface QuestionAnswerProps {
  question: string;
  tag: string;
  answer: string;
}

interface DiaryStateProps {
  _id: string;
  selectedDate: string;
  todo: TodoListProps[];
  qna: QuestionAnswerProps;
  emotion: EMOTION;
  diary: DiaryProps;
  account: AccountTableRow[];
  checkOption: OptionCheckedProps;
}

interface OptionProps {
  title: OPTIONS;
}

type OptionCheckedProps = {
  [key in OPTIONS]: boolean;
};

interface ContentOptionProps extends OptionProps {
  isChecked: boolean;
}

interface TodayDiaryProps {
  diaryInfo: DiaryStateProps;
  diaryMode: DiaryMode;
}

interface DiaryComponentPrpos {
  todayDiary: TodayDiaryProps;
  setTodayDiary: React.Dispatch<React.SetStateAction<TodayDiaryProps>>;
}

interface ContentOptionsProps {
  state: ContentOptionProps[];
  setState: React.Dispatch<React.SetStateAction<ContentOptionProps[]>>;
}

interface DiaryContentOptionsProps extends ContentOptionsProps {
  diaryMode: DiaryMode;
}

interface UpdateFormValue {
  email?: string;
  nickname: string;
  password: string;
  currentPassword: string;
}

interface RegisterFormValue {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

interface LoginFormValue {
  email: string;
  password: string;
}

interface DiaryBodyProps {
  selectedDate: string;
  emotion: EMOTION;
  diary: DiaryProps;
  qna: QuestionAnswerProps;
  todo: TodoListProps[];
  account: AccountTableRow[];
  checkOption: OptionCheckedProps;
}

interface EmotionStaticProps {
  [key: string]: number | string;
}

interface CategoriesStaticProps {
  id: string;
  label: string;
  value: number;
}

export type {
  OptionProps,
  ContentOptionProps,
  AccountTableRow,
  QuestionAnswerProps,
  TodoListProps,
  DiaryProps,
  DiaryStateProps,
  TodayDiaryProps,
  ContentOptionsProps,
  LoginFormValue,
  RegisterFormValue,
  UpdateFormValue,
  OptionCheckedProps,
  DiaryContentOptionsProps,
  DiaryComponentPrpos,
  DiaryBodyProps,
  EmotionStaticProps,
  CategoriesStaticProps,
};
