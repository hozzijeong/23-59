import uuid from 'react-uuid';
import { atom } from 'recoil';
import { emotionEnums as EMOTION } from 'types/enums';
import { AccountTableRow, EmotionRecordProps, TodoListProps } from 'types/interfaces';

const todayTodo = atom<TodoListProps[]>({
  key: `todayTodoState/${uuid()}`,
  default: [],
});

const questionAnswer = atom<{ answer: string }>({
  key: `questionAnswerState/${uuid()}`,
  default: { answer: '' },
});

const emotionRecord = atom<EmotionRecordProps>({
  key: `emotionRecordState/${uuid()}`,
  default: {
    emotionState: EMOTION.SO_SO,
    emotionDiary: {
      title: '',
      content: '',
    },
  },
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: `accountTableState/${uuid()}`,
  default: [],
});

export { accountTableAtom, todayTodo, questionAnswer, emotionRecord };
