import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  handleToggleTheme: () => {}
});

export const useTheme = () => {
  return useContext(ThemeContext);
}