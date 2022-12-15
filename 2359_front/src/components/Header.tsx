import React from 'react';
import tw from 'tailwind-styled-components';

const HeaderContainer = tw.div`
  flex
  items-center
  justify-center
  flex-col
  w-full
  bg-primary
`;

const HeaderContent = tw.div`

`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>Header!</HeaderContent>
      <HeaderContent>Header222</HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
