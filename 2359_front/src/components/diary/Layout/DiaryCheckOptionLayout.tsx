import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface AbsoluteDivProps {
  isLeft: boolean;
}

interface DiaryCheckOptionLayoutProps {
  component: JSX.Element[];
  isLeft: boolean;
}

function DiaryCheckOptionLayout({ isLeft = true, component }: DiaryCheckOptionLayoutProps) {
  return (
    <AbsoluteDiv isLeft={isLeft}>
      <FixedUl>{component}</FixedUl>
    </AbsoluteDiv>
  );
}

export default DiaryCheckOptionLayout;

const AbsoluteDiv = tw.div<AbsoluteDivProps>`
  absolute
  ${(props) => (props.isLeft ? 'left-[-7.5rem]' : 'right-0')}
  mt-12

`;

const Ullists = styled.ul`
  li {
    display: flex;
    align-content: center;
    font-size: 14px;
  }
`;

const FixedUl = tw(Ullists)`
  fixed
`;
