import React, { useMemo } from 'react';

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

function AccountBook() {
  const categoryOptions = useMemo(() => ACCOUNT_CATEGORY.map((category) => <option>{category}</option>), []);
  const appendAccountInfoHandler = () => {
    return null;
  };
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
        <tbody>a</tbody>
      </table>
    </div>
  );
}

export default AccountBook;
