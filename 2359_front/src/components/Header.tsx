import React from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = tw.div`
  w-full
  h-[115px]
  bg-primaryDark
`;

const HeaderContent = tw.div`
  max-w-screen-lg
  flex
  justify-between
  items-center
  my-0
  mx-auto
  pt-[25px]
`;

const Logo = tw.button`
  h-[6rem]
`;

const HeaderRightContainer = tw.div`
  flex
  justify-around
  w-[200px]
`;

function Header() {
  const nav = useNavigate();

  const logoClickHandler = () => {
    nav('/user/main');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={logoClickHandler}>Logo</Logo>
        <HeaderRightContainer>
          <button type="button">myPage</button>
          <button type="button">logout</button>
        </HeaderRightContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
