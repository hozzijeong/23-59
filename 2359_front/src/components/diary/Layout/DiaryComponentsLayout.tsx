import React, { ReactNode } from 'react';
import { ContentOptionProps, CONTENT_OPTION } from 'pages/Diary';
import tw from 'tailwind-styled-components';

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
  mt-[2rem] 
`;

const Title = tw.h1`
  text-3xl
`;
