import React, { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import { CONTENT_OPTION } from 'types/enumConverter';
import { ContentOptionProps } from 'types/interfaces';

interface DiaryComponentLayoutProps {
  contents: ContentOptionProps;
  children: ReactNode;
}

function DiaryComponentsLayout({ contents, children }: DiaryComponentLayoutProps) {
  const id = CONTENT_OPTION[contents.title].replaceAll(' ', '-');

  return (
    <ContentContainer id={id}>
      <Title>{CONTENT_OPTION[contents.title]}</Title>
      {children}
    </ContentContainer>
  );
}

export { DiaryComponentsLayout };

const ContentContainer = tw.div`
  mt-[1rem]
  rounded 
  shadow 
  p-6 
  mx-auto
  my-4
  w-full 
  lg:w-11/12
`;

const Title = tw.h1`
  text-3xl
  mb-[1rem]
  font-bold
`;
