import React, { useMemo, useState } from 'react';

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

enum moneyFlowCategory {
  expense = '지출',
  income = '수입',
  transfer = '이체',
}

const ACCOUNT_CATEGORY: accountCategory[] = [
  '식비',
  '카페/간식',
  '술/유흥',
  '생활',
  '온라인 쇼핑',
  '패션/쇼핑',
  '뷰티/미용',
  '교통',
  '자동차',
  '주거/통신',
  '의료/건강',
  '금융',
  '문화/여가',
  '여행/숙박',
  '교육/학습',
  '자녀/육아',
  '반려동물',
  '경조/선물',
];

export interface AccountTableRow {
  id: string;
  moneyFlow: moneyFlowCategory;
  category: accountCategory;
  amount: number;
  memo: string;
}

function AccountBook() {
  const [accountTable, setAccountTable] = useState<AccountTableRow[]>([]);
  const categoryOptions = useMemo(() => ACCOUNT_CATEGORY.map((category) => <option>{category}</option>), []);

  const appendAccountInfoHandler = () => {
    return null;
  };

  const deleteTableInfoHandler = () => {
    return null;
  };

  const tableInfo = useMemo(
    () =>
      accountTable.map(({ moneyFlow, category, amount, memo }) => (
        <tr>
          <th>{moneyFlow}</th>
          <th>{category}</th>
          <th>{amount}</th>
          <th>{memo}</th>
          <th>
            <button type="button" onClick={deleteTableInfoHandler}>
              삭제하기
            </button>
          </th>
        </tr>
      )),
    [accountTable]
  );

  return (
    <div>
      <div>
        <p>오늘 수입/지출을 알려주세요</p>
        <div>
          <select>
            <option defaultChecked>지출</option>
            <option>수입</option>
            <option>이체</option>
          </select>
          <select>{categoryOptions}</select>
          <input type="number" min={0} placeholder="금액을 입력해주세요" />
          <input type="text" placeholder="메모를 입력해주세요" />
          <button type="button" onClick={appendAccountInfoHandler}>
            추가하기
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>분류</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>메모</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{tableInfo}</tbody>
      </table>
    </div>
  );
}

export default AccountBook;
