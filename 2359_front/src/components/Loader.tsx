import React from 'react';
import tw from 'tailwind-styled-components';
import { FooterContainer } from './Footer';
import { HeaderContainer } from './Header';

function Loader() {
  return (
    <LoaderContainer>
      <HeaderContainer />
      <CalenderSkeleton />
      <FooterContainer />
    </LoaderContainer>
  );
}

export { Loader };

const LoaderContainer = tw.div`
  flex
  justify-center
  items-center	
  flex-col
  h-full
  bg-primary
  animate-pulse
`;

const CalenderSkeleton = tw.div`
  w-[1024px]
  h-[672px]
  rounded-lg 
  shadow 
  overflow-hidden
  bg-primaryDark
  opacity-20
  my-16
`;
