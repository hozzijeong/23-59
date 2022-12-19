import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface AbsoluteDivProps {
  left: boolean;
}

interface DiaryCheckOptionLayoutProps {
  component: JSX.Element[];
  isleft: boolean;
}

function DiaryCheckOptionLayout({ isleft, component }: DiaryCheckOptionLayoutProps) {
  return (
    <AbsoluteDiv left={isleft}>
      <FixedUl>{component}</FixedUl>
    </AbsoluteDiv>
  );
}

export default DiaryCheckOptionLayout;

const AbsoluteDiv = tw.div<AbsoluteDivProps>`
  absolute
  ${(props) => (props.left ? 'left-[-7.5rem]' : 'right-0')}
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
