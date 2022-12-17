import { atom } from 'recoil';

interface TodoListProps {
  id: string;
  isChecked: boolean;
  todoContent: string;
}

interface DiaryStateProps {
  todos: TodoListProps[];
  questionAnswer: string;
}

export const diaryAtom = atom<DiaryStateProps>({
  key: 'diaryState',
  default: {
    todos: [],
    questionAnswer: '',
  },
});
