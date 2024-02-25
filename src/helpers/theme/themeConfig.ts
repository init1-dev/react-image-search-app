import { createGlobalStyle } from 'styled-components';

// Define la interfaz del tema
export interface Theme {
    body: string;
    text: string;
    html: string;
    header: string;
    headerH1: string;
    savedCardBg: string;
    appBg: string;
    footerText: string;
    btnText: string;
    btnHoverText: string;
    themeButtonBg: string;
    searchBarBg: string;
  }
  
  // Define los temas
  const darkHeader = '#242f3f';
  const darkBg = '#373e49';
  
  export const lightTheme: Theme = {
    body: '#e3e3e3',
    text: '#000000',
    html: '#e3e3e3',
    header: '#cac9c7',
    headerH1: '#000',
    savedCardBg: '#E3E3E3',
    appBg: '#f1f1f1',
    footerText: '#6D6D6D',
    btnText: '#767676',
    btnHoverText: '#000',
    themeButtonBg: '#E3E3E3',
    searchBarBg: '#EEEEEE',
  };
  
  export const darkTheme: Theme = {
    body: darkBg,
    text: '#fff',
    html: darkBg,
    header: darkHeader,
    headerH1: '#fff',
    savedCardBg: '#171d27',
    appBg: '#1d242f',
    footerText: '#ffffffad',
    btnText: '#ffffffba',
    btnHoverText: '#fff',
    themeButtonBg: darkBg,
    searchBarBg: '#21252a',
  };
  
  // Estilos globales
  export const GlobalStyles = createGlobalStyle<{ theme?: Theme }>`
    html {
      background-color: ${({ theme }) => theme.html};
    }
    header {
      background-color: ${({ theme }) => theme.header};
    }
  `;