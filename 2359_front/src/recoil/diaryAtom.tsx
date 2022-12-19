import { atom } from 'recoil';

enum emotionEnums {
  VERY_BAD = 'Very Bad',
  BAD = 'Bad',
  SO_SO = 'SoSo',
  GOOD = 'Good',
  VERY_GOOD = 'Very Good',
}

const EMOTIONS = {
  [emotionEnums.VERY_BAD]: '매우 안좋음',
  [emotionEnums.BAD]: '안좋음',
  [emotionEnums.SO_SO]: '보통',
  [emotionEnums.GOOD]: '좋음',
  [emotionEnums.VERY_GOOD]: '매우 좋음',
};

type accountCategory =
  | '식비'
  | '카페/간식'
  | '술/유흥'
  | '생활'
  | '온라인 쇼핑'
  | '패션/쇼핑'
  | '뷰티/미용'
  | '교통'
  | '자동차'
  | '주거/통신'
  | '의료/건강'
  | '금융'
  | '문화/여가'
  | '여행/숙박'
  | '교육/학습'
  | '자녀/육아'
  | '반려동물'
  | '경조/선물';

type moneyFlowCategory = '지출' | '수입' | '이체';

interface AccountTableRow {
  id: string;
  moneyFlow: moneyFlowCategory;
  category: accountCategory;
  amount: number;
  memo: string;
}

interface TodoListProps {
  id: string;
  isChecked: boolean;
  todoContent: string;
}

interface EmotionRecordProps {
  emotionState: emotionEnums;
  emotionDiary: string;
}

interface DiaryStateProps {
  todos?: TodoListProps[];
  questionAnswer?: string;
  emotionRecord?: EmotionRecordProps;
  accountTable?: AccountTableRow[];
}

const diaryAtom = atom<DiaryStateProps>({
  key: 'diaryState',
  default: {
    todos: [],
    questionAnswer: '',
    emotionRecord: {
      emotionState: emotionEnums.SO_SO,
      emotionDiary: '',
    },
    accountTable: [],
  },
});

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
    emotionState: emotionEnums.SO_SO,
    emotionDiary: '',
  },
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: 'accountTableState',
  default: [],
});

export { diaryAtom, accountTableAtom, todayTodo, questionAnswer, emotionRecord, emotionEnums, EMOTIONS };
export type { AccountTableRow, accountCategory, moneyFlowCategory };
