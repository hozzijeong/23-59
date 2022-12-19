import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface AbsoluteDivProps {
  isleft: boolean;
}

interface DiaryCheckOptionLayoutProps {
  component: JSX.Element[];
  isleft: boolean;
}

function DiaryCheckOptionLayout({ isleft = true, component }: DiaryCheckOptionLayoutProps) {
  return (
    <AbsoluteDiv isleft={isleft}>
      <FixedUl>{component}</FixedUl>
    </AbsoluteDiv>
  );
}

export default DiaryCheckOptionLayout;

const AbsoluteDiv = tw.div<AbsoluteDivProps>`
  absolute
  ${(props) => (props.isleft ? 'left-[-7.5rem]' : 'right-0')}
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
