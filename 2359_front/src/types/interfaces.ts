import { ModalBasicProps } from 'components/ModalBasic';
import {
  expense as EXPENSE,
  income as INCOME,
  emotion as EMOTION,
  cls,
  option as OPTIONS,
  diaryMode as DiaryMode,
} from 'types/enums';

interface AccountTableRow {
  id: string;
  cls: cls;
  category: EXPENSE | INCOME;
  amount: string;
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
  answer: string;
  questionId: string;
}

type EmotionType = EMOTION | null;

interface DiaryStateProps {
  _id: string;
  selectedDate: string;
  todo: TodoListProps[];
  qna: QuestionAnswerProps;
  emotion: EmotionType;
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

interface ModalComponentProps {
  setModalProps?: React.Dispatch<React.SetStateAction<ModalBasicProps>>;
  toggleModal?: () => void;
}

interface DiaryComponentPrpos extends ModalComponentProps {
  todayDiary: TodayDiaryProps;
  setTodayDiary?: React.Dispatch<React.SetStateAction<TodayDiaryProps>>;
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
  emotion: EmotionType;
  diary: DiaryProps;
  qna: {
    questionId: string;
    answer: string;
  };
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

interface RandomQuestionProps {
  _id: string;
  item: string;
}

interface errorData {
  reason: string;
  result: string;
}

interface PrivateRouteProps {
  authentication: boolean;
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
  RandomQuestionProps,
  EmotionType,
  errorData,
  PrivateRouteProps,
};
