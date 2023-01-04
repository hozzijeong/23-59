import uuid from 'react-uuid';
import { atom } from 'recoil';
import { AccountTableRow, DiaryProps, EmotionType, QuestionAnswerProps, TodoListProps } from 'types/interfaces';
import { INITIAL_TODAY_DIARY, QNA_INNITIAL } from 'constant/initialValues';

const todayTodo = atom<TodoListProps[]>({
  key: `todayTodoState/${uuid()}`,
  default: [],
});

const questionAtom = atom<QuestionAnswerProps>({
  key: `questionState/${uuid()}`,
  default: QNA_INNITIAL,
});

const emotionAtom = atom<EmotionType>({
  key: `emotionState/${uuid()}`,
  default: null,
});

const todayDiaryAtom = atom<DiaryProps>({
  key: `todayDiaryState/${uuid()}`,
  default: INITIAL_TODAY_DIARY,
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: `accountTableState/${uuid()}`,
  default: [],
});

export { accountTableAtom, todayTodo, questionAtom, emotionAtom, todayDiaryAtom };
