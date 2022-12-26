import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
  const nav = useNavigate();
  const [loginState, setLoginState] = useState<boolean>(false);
  const navigate = useNavigate();
  const getToken = localStorage.getItem('token') ? true : null;
  const handleLoginClick = () => {
    if (getToken === null) {
      setLoginState(true);
      navigate('/');
    } else {
      localStorage.clear();
      setLoginState(false);
      navigate('/login');
    }
  };

  const logoClickHandler = () => {
    nav('/user/main');
  };

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
        <Logo onClick={logoClickHandler}>Logo</Logo>
        <HeaderRightContainer>
          <Link to="/mypage/user">myPage</Link>
          <GetLog onClick={handleLoginClick}>{loginState ? `logout` : `login`}</GetLog>
        </HeaderRightContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;

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

const GetLog = tw.div`
  flex
  justify-around
  w-[200px]
  cursor-pointer
`;
