import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { ThemeContext } from '../theme/ThemeContext';

const PlayerContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${props => props.theme.shadow};
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const PlayButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.5rem;

  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.theme.secondary};
  }
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
  width: 100px;
  accent-color: ${props => props.theme.primary};
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-size: 0.9rem;
  color: ${props => props.isPlaying ? 'green' : props.theme.text};
`;

const AudioPlayer = ({ station }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState(t('player.waiting'));
  const audioRef = useRef(null);
  const { theme } = useContext(ThemeContext);

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
      <Controls>
        <PlayButton onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </PlayButton>
        
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
      </Controls>
      
      <StatusIndicator isPlaying={isPlaying}>
        {status}
      </StatusIndicator>
      
      <audio ref={audioRef} src={station.streamUrl} preload="none" />
    </PlayerContainer>
  );
};

export default AudioPlayer;