import React from 'react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';
import TwitchPlayer from './TwitchPlayer';

const MediaPlayerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StationInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const StationName = styled.h2`
  color: ${props => props.theme.text};
  margin: 0;
  font-size: 1.8rem;
`;

const StationDescription = styled.p`
  color: ${props => props.theme.text};
  opacity: 0.8;
  margin: 10px 0 0;
`;

const StationLogo = styled.img`
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
    e.target.src = '/logos/default-media.png';
  };

  return (
    <MediaPlayerContainer>
      <StationInfo>
        <StationLogo 
          src={station.logo} 
          alt={station.name} 
          onError={handleImageError}
        />
        <StationName>{station.name}</StationName>
        <StationDescription>{station.description}</StationDescription>
      </StationInfo>
      
      {station.type === 'radio' ? (
        <AudioPlayer station={station} />
      ) : station.type === 'twitch' ? (
        <TwitchPlayer station={station} />
      ) : (
        <div>Tipo di media non supportato</div>
      )}
    </MediaPlayerContainer>
  );
};

export default MediaPlayer;