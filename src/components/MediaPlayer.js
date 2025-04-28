import React from 'react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';
import TwitchPlayer from './TwitchPlayer';
import { motion, AnimatePresence } from 'framer-motion';

const MediaPlayerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StationInfo = styled(motion.div)`
  text-align: center;
  margin-bottom: 20px;
`;

const StationName = styled(motion.h2)`
  color: ${props => props.theme.text};
  margin: 0;
  font-size: 1.8rem;
`;

const StationDescription = styled(motion.p)`
  color: ${props => props.theme.text};
  opacity: 0.8;
  margin: 10px 0 0;
`;

const StationLogo = styled(motion.img)`
  width: 30%;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
  margin: 0 auto 15px;
  display: block;
  border: 2px solid ${props => props.theme.primary};
`;

const MediaPlayer = ({ station }) => {
  // Gestisce l'errore di caricamento delle immagini
  const handleImageError = (e) => {
    e.target.src = '/radioapp/logos/default-media.png';
  };

  return (
    <MediaPlayerContainer>
      <AnimatePresence mode="wait">
        <StationInfo
          key={station.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <StationLogo
            src={station.logo}
            alt={station.name}
            onError={handleImageError}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <StationName
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {station.name}
          </StationName>
          <StationDescription
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {station.description}
          </StationDescription>
        </StationInfo>


        {station.type === 'radio' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <AudioPlayer station={station} />
          </motion.div>
        ) : station.type === 'twitch' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <TwitchPlayer station={station} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            Tipo di media non supportato
          </motion.div>
        )}
        </AnimatePresence>
    </MediaPlayerContainer>
  );
};

export default MediaPlayer;