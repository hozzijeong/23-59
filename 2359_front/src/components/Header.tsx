import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
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
        <Logotest onClick={logoClickHandler}>
          23<Colon>:</Colon>59
        </Logotest>
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

const Colon = styled.span`
  animation-name: filcker;
  animation-duration: 1s;
  animation-timing-function: steps(2, start);
  animation-iteration-count: infinite;
  animation-direction: alternate;

  @keyframes filcker {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
