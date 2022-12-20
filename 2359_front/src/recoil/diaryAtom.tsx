import { atom } from 'recoil';
import { emotionEnums as EMOTION } from 'types/enums';
import { AccountTableRow, EmotionRecordProps, TodoListProps } from 'types/interfaces';

const todayTodo = atom<TodoListProps[]>({
  key: 'todayTodoState',
  default: [],
});

const questionAnswer = atom<{ answer: string }>({
  key: 'questionAnswerState',
  default: { answer: '' },
});

const emotionRecord = atom<EmotionRecordProps>({
  key: 'emotionRecordState',
  default: {
    emotionState: EMOTION.SO_SO,
    emotionDiary: {
      title: '',
      content: '',
    },
  },
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: 'accountTableState',
  default: [],
});

export { accountTableAtom, todayTodo, questionAnswer, emotionRecord };
