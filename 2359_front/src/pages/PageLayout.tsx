import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Header from '../components/Header';

const Container = tw.div`
  max-w-screen-lg
  my-0
  mx-auto
  relative
`;

const Main = tw.main`
  w-full
  bg-primary
`;

function PageLayout() {
  return (
    <Main>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Main>
  );
}

export default PageLayout;
