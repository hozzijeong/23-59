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
  }
  
  input, textarea{
    outline:none;
  }

`;

export default GlobalStyle;
