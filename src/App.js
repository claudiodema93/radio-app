import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './theme/ThemeContext';
import RadioPlayer from './components/RadioPlayer';
import TwitchPlayer from './components/TwitchPlayer';
import Navigation from './components/Navigation';
import ProgramsList from './components/ProgramsList';

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
  background-color: ${props => props.theme.background};
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background-color: ${props => props.theme.primary};
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const LogoImage = styled.img`
  width: autopx;
  height: 40px;
  background-color: white;
  border: 5px solid white;
  border-radius: 5px;
  object-fit: contain;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  margin-left: 10px;
`;

// Animazione per il fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
`;

// Animazione per il fade-out
const fadeOut = keyframes`
  from {
    opacity: 1;
    max-height: 500px;
  }
  to {
    opacity: 0;
    max-height: 0;
  }
`;

// Rimuoviamo l'animazione slideDown fissa e usiamo un approccio più dinamico
const PlayerContainer = styled.div`
  animation: ${props => props.isFadingOut ? fadeOut : fadeIn} ${props => props.isFadingOut ? '0.5s' : '1.5s'} ease-in-out;
  animation-delay: ${props => props.isFirstSelection && !props.isFadingOut ? '0.2s' : '0s'};
  opacity: ${props => props.isFadingOut ? 1 : 0};
  max-height: ${props => props.isFadingOut ? 'auto' : '0'};
  overflow: hidden;
  animation-fill-mode: forwards;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ProgramsListContainer = styled.div`
  transition: transform 1.5s ease-in-out;
  transform: translateY(${props => props.playerVisible ? 'var(--player-height, 0px)' : '0'});
`;

const Main = styled.main`
  padding: 20px;
  background-color: white;
  position: relative;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: ${props => props.theme.primary};
  color: white;
  font-size: 0.9rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  const { t } = useTranslation();
  // Inizialmente non selezionare nessuna stazione
  const [selectedStation, setSelectedStation] = useState(null);
  const [previousStation, setPreviousStation] = useState(null);
  const [firstSelection, setFirstSelection] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const playerRef = React.useRef(null);

  // Gestisce il fade-out e il cambio di stazione
  const handleStationSelect = (station) => {
    if (selectedStation) {
      // Se c'è già una stazione selezionata, avvia il fade-out
      setIsFadingOut(true);
      setPreviousStation(selectedStation);
      
      // Dopo il fade-out, cambia la stazione
      setTimeout(() => {
        setSelectedStation(station);
        setIsFadingOut(false);
      }, 500); // Durata dell'animazione di fade-out
    } else {
      // Prima selezione, nessun fade-out necessario
      setSelectedStation(station);
    }
  };

  // Gestisce la prima selezione
  useEffect(() => {
    if (selectedStation && firstSelection) {
      // Diamo tempo al player di renderizzarsi prima di misurarne l'altezza
      setTimeout(() => {
        if (playerRef.current) {
          const height = playerRef.current.offsetHeight;
          document.documentElement.style.setProperty('--player-height', `${height}px`);
        }
      }, 100);
      
      setTimeout(() => {
        setFirstSelection(false);
      }, 2000); // Durata dell'animazione completa
    }
  }, [selectedStation, firstSelection]);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppContainer>
        <ContentContainer>
          <Header>
            <Navigation />
            <Logo>
              <LogoImage src={process.env.PUBLIC_URL + '/logo.png'} alt="Radio Antenna 1 Logo" />
            </Logo>
          </Header>

          <Main>
            <div ref={playerRef}>
              {isFadingOut && previousStation ? (
                <PlayerContainer show={true} isFadingOut={true}>
                  {previousStation.type === 'radio' && (
                    <RadioPlayer station={previousStation} />
                  )}
                  {previousStation.type === 'twitch' && (
                    <TwitchPlayer station={previousStation} />
                  )}
                </PlayerContainer>
              ) : (
                <PlayerContainer 
                  show={selectedStation !== null} 
                  isFirstSelection={firstSelection}
                  isFadingOut={false}
                >
                  {selectedStation && selectedStation.type === 'radio' && (
                    <RadioPlayer station={selectedStation} />
                  )}
                  {selectedStation && selectedStation.type === 'twitch' && (
                    <TwitchPlayer station={selectedStation} />
                  )}
                </PlayerContainer>
              )}
            </div>
            
            <ProgramsListContainer playerVisible={selectedStation && firstSelection}>
              <ProgramsList setSelectedStation={handleStationSelect} />
            </ProgramsListContainer>
          </Main>

          <Footer>
            <SocialIcons>
              <FooterLink href="https://www.facebook.com/antenna.uno"><i className="fab fa-facebook-f"></i></FooterLink>
              <FooterLink href="https://www.instagram.com/antenna.uno/"><i className="fab fa-instagram"></i></FooterLink>
              <FooterLink href="https://www.youtube.com/c/RadioAntennaUno"><i className="fab fa-youtube"></i></FooterLink>
              <FooterLink href="https://www.twitch.tv/radioantenna1"><i className="fab fa-twitch"></i></FooterLink>
              <FooterLink href="https://open.spotify.com/show/4RlTmyKCpixfG0DNsvhfZZ"><i className="fab fa-spotify"></i></FooterLink>
            </SocialIcons>
            <FooterLinks>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Contatti</FooterLink>
            </FooterLinks>
          </Footer>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
