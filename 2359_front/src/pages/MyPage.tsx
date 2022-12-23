import React from 'react';
import tw from 'tailwind-styled-components';
import Navbar from 'components/mypage/Navbar';
import { Outlet } from 'react-router-dom';

const FlexContainer = tw.div`
  flex
  min-h-[600px]
`;

function MyPage() {
  return (
    <FlexContainer>
      <Navbar />
      <Outlet />
    </FlexContainer>
  );
}

export default MyPage;
