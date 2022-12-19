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
  min-h-[800px]
`;

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <footer>푸터입니다.</footer>
    </>
  );
}

export default PageLayout;
