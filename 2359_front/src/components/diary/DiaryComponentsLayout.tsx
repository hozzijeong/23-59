import React, { ReactNode } from 'react';
import { ContentOptionProps } from 'pages/Diary';
import tw from 'tailwind-styled-components';

interface DiaryComponentLayoutProps {
  contents: ContentOptionProps;
  children: ReactNode;
}

const ContentContainer = tw.div`
  mt-[2rem] 
`;

const Title = tw.h1`
  text-5xl
`;

function DiaryComponentsLayout({ contents, children }: DiaryComponentLayoutProps) {
  const id = contents.title.replaceAll(' ', '-');

  return (
    <ContentContainer id={id}>
      <Title>{contents.title}</Title>
      {children}
    </ContentContainer>
  );
}

export default DiaryComponentsLayout;
