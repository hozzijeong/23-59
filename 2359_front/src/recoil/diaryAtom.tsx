import { atom } from 'recoil';

interface TodoListProps {
  isChecked: boolean;
  todoContent: string;
}

interface DiaryStateProps {
  todos: TodoListProps[];
}

export const diaryAtom = atom<DiaryStateProps>({
  key: 'diaryState',
  default: {
    todos: [],
  },
});
