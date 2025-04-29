import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './theme/ThemeContext';
import RadioPlayer from './components/RadioPlayer';
import TwitchPlayer from './components/TwitchPlayer';
import Navigation from './components/Navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Team from './pages/Team';

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

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

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

const Main = styled.main`
  padding: 20px;
  background-color: ${props => props.theme.background};;
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

// Aggiungi questa funzione all'inizio del file, dopo gli import
const isElectron = () => {
  return window && window.process && window.process.type;
};

function App() {
  const { t } = useTranslation();
  // Inizialmente non selezionare nessuna stazione
  const [selectedStation, setSelectedStation] = useState(null);
  const [previousStation, setPreviousStation] = useState(null);
  const [firstSelection, setFirstSelection] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const playerRef = React.useRef(null);
  const [activePage, setActivePage] = useState('home');

  const renderContent = () => {
    switch (activePage) {
      case 'events':
        return <Events />;
      case 'team':
        return <Team />;
      case 'partners':
        return <Partners />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setSelectedStation={handleStationSelect} ></Home>;
    }
  }

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

  // Aggiungi questo useEffect per gestire il comportamento specifico di Electron
  useEffect(() => {
    if (isElectron()) {
      // Configurazioni specifiche per Electron
      document.title = t('app.title');
      
      // Esempio: disabilita il menu contestuale del browser in Electron
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      }, false);
    }

  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppContainer>
        <ContentContainer>
          <Header>
            <Navigation activePage={activePage} setActivePage={setActivePage} />
            <Logo>
              <LogoImage src={process.env.PUBLIC_URL + '/logo.png'} alt="Radio Antenna 1 Logo" />
            </Logo>
          </Header>

          <Main>
            <div ref={playerRef}>
              {isFadingOut && previousStation ? (
                <PlayerContainer show={true.toString()} isFadingOut={true.toString()}>
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
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
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
              <FooterLink href="#">{t('footer.privacy')}</FooterLink>
              <FooterLink href="#">{t('footer.faq')}</FooterLink>
              <FooterLink href="#">{t('footer.contacts')}</FooterLink>
            </FooterLinks>
          </Footer>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
