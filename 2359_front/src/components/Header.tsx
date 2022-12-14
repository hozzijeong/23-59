import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: 115px;
  background-color: #bdb9b9;
`;

const HeaderContent = styled.div`
  width: 1024px;
  margin: 0 auto;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>Header!</HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
