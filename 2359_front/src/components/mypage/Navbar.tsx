import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { NavLink, useLocation } from 'react-router-dom';

const isSelected = 'font-bold space-y-3 flex flex-col ml-4';
const isNotSelected = 'space-y-3 flex flex-col ml-4';
const statisticsURL = ['/mypage/emotion', '/mypage/account'];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const statisticsClass = (): string => {
    if (statisticsURL.includes(pathname)) {
      return `font-bold space-y-3 flex flex-col ml-4`;
    }
    return `space-y-3 flex flex-col ml-4`;
  };

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideNavbar>
      <NavLink to="user" className={({ isActive }) => (isActive ? isSelected : isNotSelected)}>
        회원 정보 수정
      </NavLink>
      <NavLink to="select-option" className={({ isActive }) => (isActive ? isSelected : isNotSelected)}>
        작성페이지 옵션 설정
      </NavLink>
      <div
        onClick={() => {
          openHandler();
        }}
        style={{ cursor: 'pointer' }}
        className={statisticsClass()}
      >
        통계 보기
      </div>
      {isOpen ? (
        <StatisticsDiv>
          <NavLink to="emotion" className={({ isActive }) => (isActive ? isSelected : isNotSelected)}>
            한달 감정 통계
          </NavLink>
          <NavLink to="account" className={({ isActive }) => (isActive ? isSelected : isNotSelected)}>
            가계부 통계
          </NavLink>
        </StatisticsDiv>
      ) : null}
      <NavLink to="collect-question" className={({ isActive }) => (isActive ? isSelected : isNotSelected)}>
        오늘의 질문 모아보기
      </NavLink>
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
  ml-2
`;
