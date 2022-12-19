import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideNavbar>
      <Link to="user">회원 정보 수정</Link>
      <Link to="select-option">작성페이지 옵션 설정</Link>
      <div
        onClick={() => {
          openHandler();
        }}
        style={{ cursor: 'pointer' }}
      >
        통계 보기
      </div>
      {isOpen ? (
        <StatisticsDiv>
          <Link to="emotion">한달 감정 통계</Link>
          <Link to="account">가계부 통계</Link>
        </StatisticsDiv>
      ) : null}
      <Link to="collect-question">오늘의 질문 모아보기</Link>
    </SideNavbar>
  );
}

export default Navbar;

const SideNavbar = tw.div`
  flex
  w-64
  flex-col
  justify-start
  items-start
  p-4
  pt-10
  space-y-5
`;

const StatisticsDiv = tw.div`
  space-y-3
  flex
  flex-col
  ml-4
`;
