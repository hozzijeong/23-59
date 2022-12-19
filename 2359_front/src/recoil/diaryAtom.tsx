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

enum accountEnums {
  FOOD = 'FOOD',
  CAFE = 'CAFE',
  ENTERTAIN = 'ENTERTAIN',
  LIVING = 'LIVING',
  ONLINE_SHOP = 'ONLINE_SHOP',
  FASSION = 'FASSION',
  BEAUTY = 'BEAUTY',
  TRAFFIC = 'TRAFFIC',
  CAR = 'CAR',
  DWELLING = 'DWELLING',
  HEALTH = 'HEALTH',
  FINANCE = 'FINANCE',
  CURTURE = 'CURTURE',
  TRABLE = 'TRABLE',
  EDUCATION = 'EDUCATION',
  CHILDREN = 'CHILDREN',
  PET = 'PET',
  PRESENT = 'PRESENT',
}

const ACCOUNT_CATEGORY = {
  [accountEnums.FOOD]: '식비',
  [accountEnums.CAFE]: '카페/간식',
  [accountEnums.ENTERTAIN]: '술/유흥',
  [accountEnums.LIVING]: '생활',
  [accountEnums.ONLINE_SHOP]: '온라인 쇼핑',
  [accountEnums.FASSION]: '패션/쇼핑',
  [accountEnums.BEAUTY]: '뷰티/미용',
  [accountEnums.TRAFFIC]: '교통',
  [accountEnums.CAR]: '자동차',
  [accountEnums.DWELLING]: '주거/통신',
  [accountEnums.HEALTH]: '의료/건강',
  [accountEnums.FINANCE]: '금융',
  [accountEnums.CURTURE]: '문화/여가',
  [accountEnums.TRABLE]: '여행/숙박',
  [accountEnums.EDUCATION]: '교육/학습',
  [accountEnums.CHILDREN]: '자녀/육아',
  [accountEnums.PET]: '반려동물',
  [accountEnums.PRESENT]: '경조/선물',
};

enum moneyFlowEnums {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
}

const MONEY_FLOW = {
  [moneyFlowEnums.EXPENSE]: '지출',
  [moneyFlowEnums.INCOME]: '수입',
  [moneyFlowEnums.TRANSFER]: '이체',
};

interface AccountTableRow {
  id: string;
  moneyFlow: moneyFlowEnums;
  category: accountEnums;
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

export {
  diaryAtom,
  accountTableAtom,
  todayTodo,
  questionAnswer,
  emotionRecord,
  emotionEnums,
  EMOTIONS,
  accountEnums,
  moneyFlowEnums,
  ACCOUNT_CATEGORY,
  MONEY_FLOW,
};
export type { AccountTableRow };
