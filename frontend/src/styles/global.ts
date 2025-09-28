'use client'

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    border: none;
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;