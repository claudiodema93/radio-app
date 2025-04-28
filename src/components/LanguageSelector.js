import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const LanguageButton = styled.button`
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
  
  ${props => props.active && `
    background-color: rgba(255, 255, 255, 0.1);
  `}
`;

const LanguageTitle = styled.div`
  color: white;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const LanguageSelector = ({ closeMenu }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (closeMenu) closeMenu();
  };

  return (
    <LanguageSelectorContainer>
      <LanguageTitle>Lingua</LanguageTitle>
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