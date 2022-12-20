import React, { useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { accountTableAtom } from 'recoil/diaryAtom';
import { EXPENSE_CATEGORY, INCOME_CATEGORY, CLS } from 'types/enumConverter';
import { expenseEnums as EXPENSE, incomeEnums as INCOME, clsEnums as MONEY } from 'types/enums';
import { AccountTableRow } from 'types/interfaces';
import { getCurrentDate } from 'utilities/getCurrentDate';

const EXPENSE_STATE = Object.values(EXPENSE);
const INCOME_STATE = Object.values(INCOME);

const MONEY_STATE = Object.values(MONEY);

const initialAccountInfo: AccountTableRow = {
  id: getCurrentDate(),
  cls: MONEY.EXPENSE,
  category: EXPENSE.FOOD,
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
      MONEY_STATE.map((type) => (
        <option key={uuid()} value={type}>
          {CLS[type]}
        </option>
      )),
    []
  );

  const categoryOptions = useMemo(() => {
    const { cls } = todayAccountInfo;

    if (cls === MONEY.EXPENSE) {
      return EXPENSE_STATE.map((category) => (
        <option key={uuid()} value={category}>
          {EXPENSE_CATEGORY[category]}
        </option>
      ));
    }
    if (cls === MONEY.INCOME) {
      return INCOME_STATE.map((category) => (
        <option key={uuid()} value={category}>
          {INCOME_CATEGORY[category]}
        </option>
      ));
    }

    return null;
  }, [todayAccountInfo]);

  const tableInfo = useMemo(
    () =>
      accountTable.map(({ id, cls, category, amount, memo }) => (
        <tr key={uuid()}>
          <th>{CLS[cls]}</th>
          <th>{cls === MONEY.EXPENSE ? EXPENSE_CATEGORY[category as EXPENSE] : INCOME_CATEGORY[category as INCOME]}</th>
          <th>{`${amount.toLocaleString('ko-KR')}`}원</th>
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
    // 수입/이체 카테고리 설정하기
    <div>
      <div>
        <p>오늘 수입/지출을 알려주세요</p>
        <div onChange={todayAccountInfoChangeHandler}>
          <select name="cls" value={todayAccountInfo.cls}>
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

export { AccountBook };
