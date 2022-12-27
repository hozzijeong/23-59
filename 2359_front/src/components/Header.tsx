import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userLogin } from 'recoil/userAtom';
import tw from 'tailwind-styled-components';
import { VscAccount } from 'react-icons/vsc';
import { useNavigate, Link } from 'react-router-dom';
import UserAttribute from '../utilities/UserLoginAttribute';

function Header() {
  const { logoClickHandler, handleLoginClick } = UserAttribute();
  const [loginState, setLoginState] = useRecoilState(userLogin);
  const getToken = localStorage.getItem('token') ? true : null;

  useEffect(() => {
    if (getToken) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  });

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logotest onClick={logoClickHandler}>23:59</Logotest>
        <HeaderRightContainer>
          <Link to="/mypage/user" className="text-primaryLight">
            myPage
          </Link>
          <GetLog onClick={handleLoginClick}>{loginState ? `logout` : `login`}</GetLog>
        </HeaderRightContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = tw.div`
  w-full
  h-[100px]
  bg-primaryDeepDark
  opacity-80
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
  justify-between
  w-[200px]
`;

const GetLog = tw.div`
  flex
  justify-around
  mr-2
  cursor-pointer
  text-primaryLight
`;

const Logotest = tw.button`
font-['LABDigital']
text-[3rem]
text-bold
italic
opacity-80
text-primaryLight
flex
justify-center
leading-none
`;
