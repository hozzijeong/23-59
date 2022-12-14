import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  width: 1024px;
  height: auto;
  margin: 0 auto;
`;

function PageLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default PageLayout;
