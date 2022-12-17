import { atom } from 'recoil';

interface TodoListProps {
  id: string;
  isChecked: boolean;
  todoContent: string;
}

export type emotionTypes = 'Very Bad' | 'Bad' | 'SoSo' | 'Good' | 'Very Good' | null;

interface EmotionRecordProps {
  emotionState: emotionTypes;
  emotionDiary: string;
}

interface DiaryStateProps {
  todos: TodoListProps[];
  questionAnswer: string;
  emotionRecord: EmotionRecordProps;
}

export const diaryAtom = atom<DiaryStateProps>({
  key: 'diaryState',
  default: {
    todos: [],
    questionAnswer: '',
    emotionRecord: {
      emotionState: 'Bad',
      emotionDiary: '',
    },
  },
});
