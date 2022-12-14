import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 1024px;
  height: auto;
  margin: 0 auto;
`;

function PageLayout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

export default PageLayout;
