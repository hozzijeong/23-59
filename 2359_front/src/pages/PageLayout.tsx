import Footer from 'components/Footer';
import React, { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import Header from '../components/Header';

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
}

export default PageLayout;

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
