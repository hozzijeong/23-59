import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const HeaderContainer = tw.div`
ml-3
`;

const HeaderContent = tw.div`
  bg-lg
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>Header!</HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
