import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './theme/ThemeContext';
import MediaPlayer from './components/MediaPlayer';
import ThemeSelector from './components/ThemeSelector';
import StationSelector from './components/StationSelector';
import InstallButton from './components/InstallButton';
import LanguageSelector from './components/LanguageSelector';
import mediaStations from './config/mediaStations';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme.primary};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  font-size: 0.9rem;
  opacity: 0.7;
`;

function App() {
  const { t } = useTranslation();
  // Imposta la prima stazione come predefinita
  const [selectedStation, setSelectedStation] = useState(mediaStations[0]);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>{t('app.title')}</Title>
          <Subtitle>{t('app.subtitle')}</Subtitle>
          <LanguageSelector />
          <InstallButton />
        </Header>

        <ThemeSelector />

        <Main>
          <StationSelector 
            stations={mediaStations} 
            selectedStation={selectedStation} 
            onSelectStation={setSelectedStation} 
          />
          
          <MediaPlayer station={selectedStation} />
        </Main>

        <Footer>
          &copy; {new Date().getFullYear()} Media Streaming App. {t('app.footer')}
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
