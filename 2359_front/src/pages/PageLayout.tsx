import React, { ReactNode } from 'react';
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

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Main>
      <Header />
      <Container>{children}</Container>
    </Main>
  );
}

export default PageLayout;
