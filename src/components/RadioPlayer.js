import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

const PlayButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ShowTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
`;

const ShowHost = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VolumeButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 1.2rem;
`;

const VolumeSlider = styled.input`
  width: 100%;
  accent-color: ${props => props.theme.primary};
`;

const StatusContainer = styled.div`
  margin-top: 15px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusText = styled(motion.p)`
  font-size: 0.9rem;
  color: ${props => props.theme.secondary || '#888'};
  font-style: italic;
  text-align: center;
  margin: 0;
`;

const RadioPlayer = ({ station }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState(t('player.waiting'));
  const audioRef = useRef(null);

  // Quando cambia la stazione, interrompi la riproduzione e aggiorna lo stato
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setStatus(t('player.waiting'));
    }
  }, [station, t]);

  useEffect(() => {
    const audio = audioRef.current;
    
    const handlePlay = () => {
      setIsPlaying(true);
      setStatus(t('player.playing'));
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      setStatus(t('player.paused'));
    };
    
    const handleError = () => {
      setIsPlaying(false);
      setStatus(t('player.connectionError'));
    };
    
    const handleWaiting = () => {
      setStatus(t('player.loading'));
    };
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
    };
  }, [t]);

  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Errore durante la riproduzione:', error);
        setStatus(t('player.playbackError'));
      });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <PlayerContainer>
      <PlayButton onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </PlayButton>
      
      <ShowTitle>{station?.name}</ShowTitle>
      <ShowHost>{station?.description}</ShowHost>
      
      <VolumeControl>
          <VolumeButton onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </VolumeButton>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
      </VolumeControl>
      
      <StatusContainer>
        <AnimatePresence mode="wait">
          <StatusText
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {status}
          </StatusText>
        </AnimatePresence>
      </StatusContainer>
      
      <audio ref={audioRef} src={station?.streamUrl} />
    </PlayerContainer>
  );
};

export default RadioPlayer;