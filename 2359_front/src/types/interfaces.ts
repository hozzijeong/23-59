import {
  accountEnums as ACCOUNT,
  emotionEnums as EMOTION,
  moneyFlowEnums as MONEY,
  OptionEnums as OPTIONS,
} from 'types/enums';

interface AccountTableRow {
  id: string;
  moneyFlow: MONEY;
  category: ACCOUNT;
  amount: number;
  memo: string;
}

interface TodoListProps {
  id: string;
  isChecked: boolean;
  todoContent: string;
}

interface EmotionRecordProps {
  emotionState: EMOTION;
  emotionDiary: string;
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

export type { OptionProps, ContentOptionProps, AccountTableRow, TodoListProps, EmotionRecordProps, DiaryStateProps };
