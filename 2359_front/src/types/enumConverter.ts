import {
  expenseEnums as EXPENSE,
  incomeEnums as INCOME,
  emotionEnums as EMOTION,
  clsEnums,
  OptionEnums as OPTION,
} from 'types/enums';

const EMOTIONS = {
  [EMOTION.VERY_BAD]: '매우 안좋음',
  [EMOTION.BAD]: '안좋음',
  [EMOTION.SO_SO]: '보통',
  [EMOTION.GOOD]: '좋음',
  [EMOTION.VERY_GOOD]: '매우 좋음',
};

const EXPENSE_CATEGORY = {
  [EXPENSE.FOOD]: '식비',
  [EXPENSE.CAFE]: '카페/간식',
  [EXPENSE.ENTERTAIN]: '술/유흥',
  [EXPENSE.LIVING]: '생활',
  [EXPENSE.ONLINE_SHOP]: '온라인 쇼핑',
  [EXPENSE.FASSION]: '패션/쇼핑',
  [EXPENSE.BEAUTY]: '뷰티/미용',
  [EXPENSE.TRAFFIC]: '교통',
  [EXPENSE.CAR]: '자동차',
  [EXPENSE.DWELLING]: '주거/통신',
  [EXPENSE.HEALTH]: '의료/건강',
  [EXPENSE.FINANCE]: '금융',
  [EXPENSE.CURTURE]: '문화/여가',
  [EXPENSE.TRABLE]: '여행/숙박',
  [EXPENSE.EDUCATION]: '교육/학습',
  [EXPENSE.CHILDREN]: '자녀/육아',
  [EXPENSE.PET]: '반려동물',
  [EXPENSE.PRESENT]: '경조/선물',
};

const INCOME_CATEGORY = {
  [INCOME.PAY]: '급여',
  [INCOME.POKEY_MONEY]: '용돈',
  [INCOME.FINANCE]: '금융수입',
  [INCOME.BUSINESS]: '사업수입',
  [INCOME.ETC]: '기타수입',
};

const CLS = {
  [clsEnums.EXPENSE]: '지출',
  [clsEnums.INCOME]: '수입',
};

const CONTENT_OPTION = {
  [OPTION.TODO_LIST]: 'To Do List',
  [OPTION.TODAY_QUESTION]: '오늘의 질문',
  [OPTION.EMOTION]: '오늘의 감정',
  [OPTION.DIARY]: '일기',
  [OPTION.ACCOUNT_BOOK]: '가계부',
};

export { EMOTIONS, EXPENSE_CATEGORY, CLS, CONTENT_OPTION, INCOME_CATEGORY };
