import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#f5f5f5',
  text: '#333333',
  primary: '#2196f3',
  secondary: '#f50057',
  card: '#ffffff',
  shadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
  background: '#121212',
  text: '#e0e0e0',
  primary: '#90caf9',
  secondary: '#f48fb1',
  card: '#1e1e1e',
  shadow: '0 4px 8px rgba(255, 255, 255, 0.1)',
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