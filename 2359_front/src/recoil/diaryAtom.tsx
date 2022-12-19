import { atom } from 'recoil';

type emotionTypes = 'Very Bad' | 'Bad' | 'SoSo' | 'Good' | 'Very Good' | null;

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
  emotionState: emotionTypes;
  emotionDiary: string;
}

interface DiaryStateProps {
  todos: TodoListProps[];
  questionAnswer: string;
  emotionRecord: EmotionRecordProps;
}

const diaryAtom = atom<DiaryStateProps>({
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

const accountTableAtom = atom<AccountTableRow[]>({
  key: 'accountTableState',
  default: [],
});

export { diaryAtom, accountTableAtom };
export type { AccountTableRow, emotionTypes, accountCategory, moneyFlowCategory };
