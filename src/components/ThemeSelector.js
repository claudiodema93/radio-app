import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';
import { ThemeContext } from '../theme/ThemeContext';

const ThemeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const ThemeButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px 20px;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 500;
  transition: background-color 0.2s;
  text-align: left;
  width: 100%;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
  }
  
  ${props => props.active && `
    background-color: rgba(255, 255, 255, 0.1);
  `}
`;

const ThemeTitle = styled.div`
  color: white;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ThemeSelector = ({ closeMenu }) => {
  const { t } = useTranslation();
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode) => {
    toggleTheme(mode);
    if (closeMenu) closeMenu();
  };

  return (
    <ThemeSelectorContainer>
      <ThemeTitle>Tema</ThemeTitle>
      <ThemeButton 
        active={themeMode === 'light'} 
        onClick={() => handleThemeChange('light')}
      >
        <FaSun /> {t('theme.light')}
      </ThemeButton>
      
      <ThemeButton 
        active={themeMode === 'dark'} 
        onClick={() => handleThemeChange('dark')}
      >
        <FaMoon /> {t('theme.dark')}
      </ThemeButton>
      
      <ThemeButton 
        active={themeMode === 'auto'} 
        onClick={() => handleThemeChange('auto')}
      >
        <FaAdjust /> {t('theme.auto')}
      </ThemeButton>
    </ThemeSelectorContainer>
  );
};

export default ThemeSelector;