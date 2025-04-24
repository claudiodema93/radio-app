import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TwitchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadow};
`;

const TwitchPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Aspect ratio 16:9 */
  width: 100%;
`;

const TwitchPlayer = ({ station }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Carica lo script Twitch Embed
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Twitch && containerRef.current) {
        // Distruggi il player esistente se presente
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        // Crea un nuovo player Twitch
        playerRef.current = new window.Twitch.Embed(containerRef.current, {
          width: '100%',
          height: '100%',
          channel: station.channelName,
          layout: 'video',
          autoplay: true,
          parent: [window.location.hostname]
        });
      }
    };

    return () => {
      // Pulisci quando il componente viene smontato
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      document.body.removeChild(script);
    };
  }, [station.channelName]);

  return (
    <TwitchContainer>
      <TwitchPlayerWrapper>
        <div 
          ref={containerRef} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%' 
          }}
        />
      </TwitchPlayerWrapper>
    </TwitchContainer>
  );
};

export default TwitchPlayer;