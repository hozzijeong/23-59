import React from 'react';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';

const SideNavbar = tw.div`
  flex
  w-64
  flex-col
  justify-start
  items-start
  p-4
  pt-10
  space-y-4
`;

function AverageDetailMenu() {
  return (
    <div>
      <Link to="emotion">한달 감정 통계</Link>
      <br />
      <Link to="account">가계부 통계</Link>
    </div>
  );
}

function Navbar() {
  return (
    <SideNavbar>
      <Link to="user">회원 정보 수정</Link>
      <Link to="select-option">작성페이지 옵션 설정</Link>
      <p>통계 보기</p>
      <AverageDetailMenu />
      <Link to="collect-question">오늘의 질문 모아보기</Link>
    </SideNavbar>
  );
}

export default Navbar;
