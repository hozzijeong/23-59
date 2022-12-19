import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);

  // 어떻게 하면... 통계보기를 같이... bold 처리할수있을까..?
  const statisticsClass = (path: string) => {
    if (path === pathname) {
      return `font-bold space-y-3 flex flex-col ml-4`;
    }
    return `space-y-3 flex flex-col ml-4`;
  };

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideNavbar>
      <Link to="user" className={statisticsClass('/mypage/user')}>
        회원 정보 수정
      </Link>
      <Link to="select-option" className={statisticsClass('/mypage/select-option')}>
        작성페이지 옵션 설정
      </Link>
      <div
        onClick={() => {
          openHandler();
        }}
        style={{ cursor: 'pointer' }}
        className={statisticsClass('/mypage/emotion')}
      >
        통계 보기
      </div>
      {isOpen ? (
        <StatisticsDiv>
          <Link to="emotion" className={statisticsClass('/mypage/emotion')}>
            한달 감정 통계
          </Link>
          <Link to="account" className={statisticsClass('/mypage/account')}>
            가계부 통계
          </Link>
        </StatisticsDiv>
      ) : null}
      <Link to="collect-question" className={statisticsClass('/mypage/collect-question')}>
        오늘의 질문 모아보기
      </Link>
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

`;
