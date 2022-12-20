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

interface EmotionRecordProps {
  emotionState: EMOTION;
  emotionDiary: {
    title: string;
    content: string;
  };
}

interface DiaryStateProps {
  todos?: TodoListProps[];
  questionAnswer?: string;
  emotionRecord?: EmotionRecordProps;
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

export type {
  OptionProps,
  ContentOptionProps,
  AccountTableRow,
  TodoListProps,
  EmotionRecordProps,
  DiaryStateProps,
  ContentOptionsProps,
};
