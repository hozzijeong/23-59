import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Header from '../components/Header';

const Container = tw.div`
  max-w-screen-lg
  mt-0
  mb-0
  ml-auto
  mr-auto

  
`;

function PageLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default PageLayout;
