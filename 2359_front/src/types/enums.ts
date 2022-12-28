enum emotion {
  VERY_BAD = 'VERY_BAD',
  BAD = 'BAD',
  SO_SO = 'SO_SO',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD',
}

enum expense {
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

enum income {
  PAY = 'PAY',
  POKEY_MONEY = 'POKEY_MONEY',
  FINANCE = 'FINANCE',
  BUSINESS = 'BUSINESS',
  ETC = 'ETC',
}

enum cls {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

enum option {
  TODO_LIST = 'TODO_LIST',
  TODAY_QUESTION = 'TODAY_QUESTION',
  EMOTION = 'EMOTION',
  DIARY = 'DIARY',
  ACCOUNT_BOOK = 'ACCOUNT_BOOK',
}

enum diaryMode {
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export { income, emotion, expense, cls, option, diaryMode };
