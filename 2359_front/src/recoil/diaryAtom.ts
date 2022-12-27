import { atom } from 'recoil';
import { AccountTableRow, DiaryProps, EmotionType, QuestionAnswerProps, TodoListProps } from 'types/interfaces';
import { INITIAL_TODAY_DIARY, QNA_INNITIAL } from 'utilities/initialValues';

const todayTodo = atom<TodoListProps[]>({
  key: `todayTodoState`,
  default: [],
});

const questionAtom = atom<QuestionAnswerProps>({
  key: `questionState`,
  default: QNA_INNITIAL,
});

const emotionAtom = atom<EmotionType>({
  key: `emotionState`,
  default: null,
});

const todayDiaryAtom = atom<DiaryProps>({
  key: `todayDiaryState`,
  default: INITIAL_TODAY_DIARY,
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: `accountTableState`,
  default: [],
});

export { accountTableAtom, todayTodo, questionAtom, emotionAtom, todayDiaryAtom };
