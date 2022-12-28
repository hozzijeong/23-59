import React from 'react';
import tw from 'tailwind-styled-components';

function Footer() {
  return (
    <FooterContainer>
      <TeamName>23:59</TeamName>
      <Container>
        <Name>박우찬</Name>
        <Name>정호진</Name>
        <Name>홍화낙</Name>
        <Name>설지윤</Name>
        <Name>정지헌</Name>
        <Name>김혜민</Name>
      </Container>
      <CopyRight>23:59 Team All rights reserved</CopyRight>
    </FooterContainer>
  );
}

export default Footer;

export const FooterContainer = tw.div`
  w-full
  h-[115px]
  bg-primaryDeepDark
  opacity-80
`;

const Container = tw.div`
  flex
  justify-center
  items-center
`;

const TeamName = tw.div`
p-[5px]
flex
justify-center
items-center
`;

const Name = tw.span`
  p-[5px]
  text-primary
`;

const CopyRight = tw.div`
flex
justify-center
items-center
text-[13px]
`;
