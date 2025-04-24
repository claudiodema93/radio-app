import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';
import { ThemeContext } from '../theme/ThemeContext';

const ThemeSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ThemeButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const ThemeSelector = () => {
  const { t } = useTranslation();
  const { themeMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeSelectorContainer>
      <ThemeButton 
        active={themeMode === 'light'} 
        onClick={() => toggleTheme('light')}
      >
        <FaSun /> {t('theme.light')}
      </ThemeButton>
      
      <ThemeButton 
        active={themeMode === 'dark'} 
        onClick={() => toggleTheme('dark')}
      >
        <FaMoon /> {t('theme.dark')}
      </ThemeButton>
      
      <ThemeButton 
        active={themeMode === 'auto'} 
        onClick={() => toggleTheme('auto')}
      >
        <FaAdjust /> {t('theme.auto')}
      </ThemeButton>
    </ThemeSelectorContainer>
  );
};

export default ThemeSelector;