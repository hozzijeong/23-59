import React, { useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { accountCategory, accountTableAtom, AccountTableRow, moneyFlowCategory } from 'recoil/diaryAtom';
import { getCurrentDate } from 'utilities/getCurrentDate';

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

const MONEY_FLOW: moneyFlowCategory[] = ['지출', '수입', '이체'];

const initialAccountInfo: AccountTableRow = {
  id: getCurrentDate(),
  moneyFlow: '지출',
  category: '식비',
  amount: 0,
  memo: '',
};

function AccountBook() {
  const [todayAccountInfo, setTodatAccountInfo] = useState<AccountTableRow>(initialAccountInfo);
  const [accountTable, setAccountTable] = useRecoilState<AccountTableRow[]>(accountTableAtom);

  const todayAccountInfoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodatAccountInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const appendAccountInfoHandler = () => {
    setAccountTable((prev) => [...prev, { ...todayAccountInfo, id: getCurrentDate() }]);
    setTodatAccountInfo(initialAccountInfo);
  };

  const deleteTableInfoHandler = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>, id: string) => {
      setAccountTable((cur) => [...cur].filter((row) => row.id !== id));
    },
    [setAccountTable]
  );

  const moneyFlowOptions = useMemo(
    () =>
      MONEY_FLOW.map((type) => {
        return <option key={uuid()}>{type}</option>;
      }),
    []
  );

  const categoryOptions = useMemo(
    () =>
      ACCOUNT_CATEGORY.map((category) => {
        return <option key={uuid()}>{category}</option>;
      }),
    []
  );

  const tableInfo = useMemo(
    () =>
      accountTable.map(({ id, moneyFlow, category, amount, memo }) => (
        <tr key={uuid()}>
          <th>{moneyFlow}</th>
          <th>{category}</th>
          <th>{amount}</th>
          <th>{memo}</th>
          <th>
            <button type="button" onClick={(e) => deleteTableInfoHandler(e, id)}>
              삭제하기
            </button>
          </th>
        </tr>
      )),
    [accountTable, deleteTableInfoHandler]
  );

  return (
    <div>
      <div>
        <p>오늘 수입/지출을 알려주세요</p>
        <div onChange={todayAccountInfoChangeHandler}>
          <select name="moneyFlow" value={todayAccountInfo.moneyFlow}>
            {moneyFlowOptions}
          </select>
          <select name="category" value={todayAccountInfo.category}>
            {categoryOptions}
          </select>
          <div>
            <input
              type="number"
              min={0}
              placeholder="금액을 입력해주세요"
              name="amount"
              value={todayAccountInfo.amount}
            />
            <label htmlFor="memo">원</label>
          </div>
          <input id="memo" type="text" placeholder="메모를 입력해주세요" name="memo" value={todayAccountInfo.memo} />
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
