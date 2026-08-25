import "@fontsource/sirin-stencil";
import "@fontsource/kaushan-script";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  html.has-scroll-smooth {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Sirin Stencil";
    overflow-x: hidden;

    /* Deep Teal + Ivory */
    background-color: #F1F5F2;
    color: #123333;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;