import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family:'Pretendard-Regular';
    line-height: 1.5;
    margin:0;
    width: 100%;
    height:100vh;
  }
  
`;

export default GlobalStyle;
