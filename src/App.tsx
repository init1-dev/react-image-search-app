import './App.css'
// import Header from './components/Header'
// import SearchResult from './components/SearchResult'
// import Footer from './components/Footer'

import '@fortawesome/fontawesome-free/css/all.css';

import { RouterProvider } from 'react-router-dom'
import appRouter from './Routes'
import { GlobalStyles, darkTheme, lightTheme } from './helpers/theme/themeConfig';
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { loadTheme, toggleTheme } from './helpers/theme/themeUtils';
import { ThemeContext } from './hooks/themeHooks';

function App() {
  const [theme, setTheme] = useState(loadTheme);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Wrapper>
          <GlobalStyles />
          <Content>
            <RouterProvider router={appRouter} />
          </Content>
        </Wrapper>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Content = styled.div`
  
`;

export default App