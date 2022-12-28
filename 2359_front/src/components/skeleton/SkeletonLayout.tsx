/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import { FooterContainer } from 'components/Footer';
import { HeaderContainer } from 'components/Header';
import tw from 'tailwind-styled-components';

function SkeletonLayout() {
  return (
    <CalendarSkeletonContainer>
      <HeaderContainer />
      <MainSkeleton />
      <FooterContainer />
    </CalendarSkeletonContainer>
  );
}

export { SkeletonLayout };

const CalendarSkeletonContainer = tw.div`
  flex
  justify-center
  items-center	
  flex-col
  h-full
  bg-primary
  animate-pulse
`;

const MainSkeleton = tw.main`
  min-h-[800px]
`;
