import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

import { COLORS } from './constants';

export default localContext => injectGlobal`
  ${ styledNormalize };

  body {
    font-size: 18px;
    font-family: 'Circular-Std', sans-serif;
    background: ${ COLORS.BLUE };
  }

  body * {
    margin: 0;
  }
  @media (min-width: 1600px) {
    body, html {
      font-size: 1.2vw;
    }
  }
  @media (max-width: 1600px) {
    body {
      font-size: 20px;
    }
    html {
      font-size: 20px;
    }
  }
  @media (max-width: 1400px) {
    body {
      font-size: 18px;
    }
    html {
      font-size: 18px;
    }
  }
  @media (max-width: 1200px) {
    body {
      font-size: 16px;
    }
    html {
      font-size: 18px;
    }
  }
  @media (max-width: 1000px) {
    body {
      font-size: 14px;
    }
  }
  @media (max-width: 900px) {
    body {
      font-size: 12px;
    }
    html {
      font-size: 16px;
    }
  }
  @media (max-width: 700px) {
    body {
      font-size: 10px;
    }
  }
  @media (max-width: 600px) {
    body {
      font-size: 9px;
    }
  }
  @media (max-width: 500px) {
    body {
      font-size: 12px;
    }
  }
  @media (max-width: 400px) {
    body {
      font-size: 11px;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #app-content {
    height: 100%;
    background: inherit;
    color: inherit;
  }

  h1, h2, h3, h4, h5, p {
    margin-bottom: 0em;
    font-weight: normal;
    line-height: 1.4em;
    margin-top: 0.1em;
    line-height: 1.2em;
    + p {
      margin-top: 1em;
    }
  }
  h1 {
    font-size: 3em;
    font-weight: 500;
  }
  h2 {
    font-size: 2.2em;
    font-weight: 600;
  }
  h3 {
    font-size: 1.8em;
    font-weight: 600;
  }
  h4 {
    font-size: 1.8em;
    line-height: 1.3em;
  }
  h5 {
    font-size: 1.6em;
    line-height: 1.3em;
  }
  p {
    font-size: 1.2em;
    line-height: 1.3em;
    margin-bottom: 1em;
  }
  div {
    line-height: 1.3em;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  .hoverable {
    transition: transform 200ms;
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
`;
