import { accountEnums as ACCOUNT, emotionEnums as EMOTION, clsEnums, OptionEnums as OPTION } from 'types/enums';

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

const CLS = {
  [clsEnums.EXPENSE]: '지출',
  [clsEnums.INCOME]: '수입',
  [clsEnums.TRANSFER]: '이체',
};

const CONTENT_OPTION = {
  [OPTION.TODO_LIST]: 'To Do List',
  [OPTION.TODAY_QUESTION]: '오늘의 질문',
  [OPTION.EMOTION_DIARY]: '감정 일기',
  [OPTION.ACCOUNT_BOOK]: '가계부',
};

export { EMOTIONS, ACCOUNT_CATEGORY, CLS, CONTENT_OPTION };
