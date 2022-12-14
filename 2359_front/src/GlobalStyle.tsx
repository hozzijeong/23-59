import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    margin:0;
    width: 100%;
    font-size: 1em; // 1rem = 10px;
  }
`;

export default GlobalStyle;
