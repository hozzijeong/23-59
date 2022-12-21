import {
  expenseEnums as EXPENSE,
  incomeEnums as INCOME,
  emotionEnums as EMOTION,
  clsEnums,
  OptionEnums as OPTIONS,
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

interface TodayDiaryProps {
  title: string;
  content: string;
}

interface DiaryStateProps {
  todos?: TodoListProps[];
  questionAnswer?: string;
  emotion?: EMOTION;
  todayDiary?: TodayDiaryProps;
  accountTable?: AccountTableRow[];
}

interface OptionProps {
  id: string;
  title: OPTIONS;
}

interface ContentOptionProps extends OptionProps {
  isChecked: boolean;
}

interface ContentOptionsProps {
  state: ContentOptionProps[];
  setState: React.Dispatch<React.SetStateAction<ContentOptionProps[]>>;
}

interface UpdateFormValue {
  email: string;
  nickname: string;
  password: string;
  newPassword: string;
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

export type {
  OptionProps,
  ContentOptionProps,
  AccountTableRow,
  TodoListProps,
  DiaryStateProps,
  TodayDiaryProps,
  ContentOptionsProps,
  LoginFormValue,
  RegisterFormValue,
  UpdateFormValue,
};