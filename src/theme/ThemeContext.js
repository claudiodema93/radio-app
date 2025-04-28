import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  primary: '#e52d27',
  secondary: '#b31217',
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#333333',
  shadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const darkTheme = {
  primary: '#e52d27',
  secondary: '#b31217',
  background: '#222222',
  card: '#333333',
  text: '#f5f5f5',
  shadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('auto');
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const handleThemeChange = () => {
      if (themeMode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? darkTheme : lightTheme);
      } else {
        setTheme(themeMode === 'dark' ? darkTheme : lightTheme);
      }
    };

    handleThemeChange();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [themeMode]);

  const toggleTheme = (mode) => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};