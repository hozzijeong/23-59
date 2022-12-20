import { atom } from 'recoil';
import { accountEnums as ACCOUNT, emotionEnums as EMOTION, moneyFlowEnums as MONEY } from 'types/enums';

const EMOTIONS = {
  [EMOTION.VERY_BAD]: '매우 안좋음',
  [EMOTION.BAD]: '안좋음',
  [EMOTION.SO_SO]: '보통',
  [EMOTION.GOOD]: '좋음',
  [EMOTION.VERY_GOOD]: '매우 좋음',
};

const ACCOUNT_CATEGORY = {
  [ACCOUNT.FOOD]: '식비',
  [ACCOUNT.CAFE]: '카페/간식',
  [ACCOUNT.ENTERTAIN]: '술/유흥',
  [ACCOUNT.LIVING]: '생활',
  [ACCOUNT.ONLINE_SHOP]: '온라인 쇼핑',
  [ACCOUNT.FASSION]: '패션/쇼핑',
  [ACCOUNT.BEAUTY]: '뷰티/미용',
  [ACCOUNT.TRAFFIC]: '교통',
  [ACCOUNT.CAR]: '자동차',
  [ACCOUNT.DWELLING]: '주거/통신',
  [ACCOUNT.HEALTH]: '의료/건강',
  [ACCOUNT.FINANCE]: '금융',
  [ACCOUNT.CURTURE]: '문화/여가',
  [ACCOUNT.TRABLE]: '여행/숙박',
  [ACCOUNT.EDUCATION]: '교육/학습',
  [ACCOUNT.CHILDREN]: '자녀/육아',
  [ACCOUNT.PET]: '반려동물',
  [ACCOUNT.PRESENT]: '경조/선물',
};

const MONEY_FLOW = {
  [MONEY.EXPENSE]: '지출',
  [MONEY.INCOME]: '수입',
  [MONEY.TRANSFER]: '이체',
};

interface AccountTableRow {
  id: string;
  moneyFlow: MONEY;
  category: ACCOUNT;
  amount: number;
  memo: string;
}

interface TodoListProps {
  id: string;
  isChecked: boolean;
  todoContent: string;
}

interface EmotionRecordProps {
  emotionState: EMOTION;
  emotionDiary: string;
}

interface DiaryStateProps {
  todos?: TodoListProps[];
  questionAnswer?: string;
  emotionRecord?: EmotionRecordProps;
  accountTable?: AccountTableRow[];
}

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
    emotionDiary: '',
  },
});

const accountTableAtom = atom<AccountTableRow[]>({
  key: 'accountTableState',
  default: [],
});

export { accountTableAtom, todayTodo, questionAnswer, emotionRecord, EMOTIONS, ACCOUNT_CATEGORY, MONEY_FLOW };
export type { AccountTableRow };
