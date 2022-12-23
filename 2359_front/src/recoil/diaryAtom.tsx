import uuid from 'react-uuid';
import { atom } from 'recoil';
import { emotionEnums as EMOTION } from 'types/enums';
import { AccountTableRow, TodayDiaryProps, TodoListProps } from 'types/interfaces';

const todayTodo = atom<TodoListProps[]>({
  key: `todayTodoState/${uuid()}`,
  default: [],
});

const questionAnswer = atom<{ answer: string }>({
  key: `questionAnswerState/${uuid()}`,
  default: { answer: '' },
});

const emotionAtom = atom<{ emotion: EMOTION }>({
  key: `emotionState/${uuid()}`,
  default: { emotion: EMOTION.SO_SO },
});

const todayDiaryAtom = atom<TodayDiaryProps>({
  key: `todayDiaryState/${uuid()}`,
  default: {
    title: '',
    content: '',
  },
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: `accountTableState/${uuid()}`,
  default: [],
});

export { accountTableAtom, todayTodo, questionAnswer, emotionAtom, todayDiaryAtom };
