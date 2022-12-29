import React, { useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { accountTableAtom } from 'recoil/diaryAtom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { EXPENSE_CATEGORY, INCOME_CATEGORY, CLS } from 'types/enumConverter';
import { expense as EXPENSE, income as INCOME, cls as MONEY, diaryMode as DiaryMode } from 'types/enums';
import { AccountTableRow, DiaryComponentPrpos } from 'types/interfaces';
import { getCurrentDate } from 'utilities/date';
import { INITIAL_ACCOUNT_INFO } from 'constant/initialValues';
import { handleOnKeyDown } from 'utilities/utils';
import { Question } from './TodayQuestion';
import { Button } from './ToDoList';

const EXPENSE_STATE = Object.values(EXPENSE);
const INCOME_STATE = Object.values(INCOME);
const MONEY_STATE = Object.values(MONEY);

function AccountBook({ todayDiary }: DiaryComponentPrpos) {
  const [todayAccountInfo, setTodatAccountInfo] = useState<AccountTableRow>(INITIAL_ACCOUNT_INFO);
  const [accountTable, setAccountTable] = useRecoilState<AccountTableRow[]>(accountTableAtom);
  const { diaryMode } = todayDiary;

  const readMode = diaryMode === DiaryMode.READ;

  const todayAccountInfoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === MONEY.EXPENSE) {
      setTodatAccountInfo((prevInfo) => ({ ...prevInfo, [name]: value, category: EXPENSE_STATE[0] }));
      return;
    }
    if (value === MONEY.INCOME) {
      setTodatAccountInfo((prevInfo) => ({ ...prevInfo, [name]: value, category: INCOME_STATE[0] }));
      return;
    }
    setTodatAccountInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const appendAccountInfoHandler = () => {
    setAccountTable((prev) => [...prev, { ...todayAccountInfo, id: getCurrentDate() }]);

    setTodatAccountInfo(INITIAL_ACCOUNT_INFO);
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
      return INCOME_STATE.map((category, idx) => (
        <option key={uuid()} value={category} selected={idx === 0}>
          {INCOME_CATEGORY[category]}
        </option>
      ));
    }

    return null;
  }, [todayAccountInfo]);

  const tableInfo = useMemo(
    () =>
      accountTable.map(({ id, cls, category, amount, memo }) => (
        <TableRow key={uuid()}>
          <Td scope="row">{CLS[cls]}</Td>
          <Td scope="row">
            {cls === MONEY.EXPENSE ? EXPENSE_CATEGORY[category as EXPENSE] : INCOME_CATEGORY[category as INCOME]}
          </Td>
          <Td scope="row">{`${Number(amount).toLocaleString('ko-KR')}`}원</Td>
          <Td scope="row">{memo}</Td>
          {!readMode && (
            <Td scope="row">
              <button type="button" onClick={(e) => deleteTableInfoHandler(e, id)}>
                삭제하기
              </button>
            </Td>
          )}
        </TableRow>
      )),
    [deleteTableInfoHandler, accountTable, readMode]
  );

  const totalAmount = useMemo(
    () =>
      accountTable.reduce(
        (acc, { amount, cls }) => (cls === MONEY.EXPENSE ? acc - Number(amount) : acc + Number(amount)),
        0
      ),
    [accountTable]
  );

  return (
    // 수입/이체 카테고리 설정하기
    <div>
      <HeadContainer>
        <Question>오늘 수입/지출을 알려주세요</Question>
        {!readMode && (
          <InputContainer onChange={todayAccountInfoChangeHandler}>
            <select name="cls" value={todayAccountInfo.cls}>
              {moneyFlowOptions}
            </select>
            <select name="category" value={todayAccountInfo.category}>
              {categoryOptions}
            </select>
            <div style={{ backgroundColor: 'white', width: '100%' }}>
              <label htmlFor="amount">
                <input
                  type="number"
                  min={0}
                  placeholder="금액"
                  name="amount"
                  value={todayAccountInfo.amount}
                  style={{ width: '85%' }}
                />
                <span>원</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="메모를 입력해주세요"
              name="memo"
              value={todayAccountInfo.memo}
              onKeyDown={(e) => handleOnKeyDown(e, appendAccountInfoHandler)}
            />
            <AppendButton type="button" onClick={appendAccountInfoHandler}>
              추가하기
            </AppendButton>
          </InputContainer>
        )}
      </HeadContainer>
      <AccountTable>
        <TableHead>
          <TableRow thead="bg-primaryLight">
            <Th scope="col">분류</Th>
            <Th scope="col">카테고리</Th>
            <Th scope="col">금액</Th>
            <Th scope="col">메모</Th>
            {!readMode && <Th scope="col"> </Th>}
          </TableRow>
        </TableHead>
        <tbody>{tableInfo}</tbody>
        <tfoot>
          <TfootRow className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="py-3 px-6 text-base">
              Total
            </th>
            <td className="py-3 px-6">{totalAmount.toLocaleString('ko-KR')} 원</td>
          </TfootRow>
        </tfoot>
      </AccountTable>
    </div>
  );
}

export { AccountBook };

const HeadContainer = tw.div`
  mb-4
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 2fr 1.5fr;
  column-gap: 0.5rem;
  select,
  div,
  input {
    padding: 0.125rem;
    border-radius: 0.25rem;
  }
`;

const AppendButton = tw(Button)`
  w-full
`;

const AccountTable = tw.table`
  w-full
  text-sm
  text-center
  text-grey-darker
  dark:text-gray-400
  rounded  
  shadow
`;

const TableHead = tw.thead`
  text-base
  text-gray-700
  uppercase
  bg-gray-50
  dark:bg-gray-700
  dark:text-gray-400
`;

const TRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const Th = tw.th`
  py-3 
  px-6
`;

const TableRow = tw(TRow)<{ thead?: 'hover: bg-gray-50' | 'bg-primaryLight' }>`
  bg-white
  border-b
  dark:bg-gray-800
  dark:border-gray-700
  ${(props) => props.thead ?? 'hover: bg-gray-50'}
  dark:hover:bg-gray-600
`;

const Td = tw.td`
 py-4
 px-6
`;

const TfootRow = styled.tr`
  display: grid;
  grid-template-columns: 1fr 4fr;
  font-weight: 600;
  color: rgb(17 24 39);
  td {
    text-align: right;
  }
`;
