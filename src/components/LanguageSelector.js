import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const LanguageButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LanguageSelectorContainer>
      <LanguageButton 
        active={i18n.language === 'it'} 
        onClick={() => changeLanguage('it')}
      >
        🇮🇹 Italiano
      </LanguageButton>
      <LanguageButton 
        active={i18n.language === 'en'} 
        onClick={() => changeLanguage('en')}
      >
        🇬🇧 English
      </LanguageButton>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;