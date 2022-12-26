import uuid from 'react-uuid';
import { atom } from 'recoil';
import { emotionEnums as EMOTION } from 'types/enums';
import { AccountTableRow, DiaryProps, QuestionAnswerProps, TodoListProps } from 'types/interfaces';
import { INITIAL_TODAY_DIARY, QNA_INNITIAL } from 'utilities/initialValues';

const todayTodo = atom<TodoListProps[]>({
  key: `todayTodoState/${uuid()}`,
  default: [],
});

const questionAtom = atom<QuestionAnswerProps>({
  key: `questionState/${uuid()}`,
  default: QNA_INNITIAL,
});

const emotionAtom = atom<EMOTION>({
  key: `emotionState/${uuid()}`,
  default: EMOTION.SO_SO,
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
