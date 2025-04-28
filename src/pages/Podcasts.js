import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PageContainer = styled(motion.div)`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: ${props => props.theme.primary};
`;

const PodcastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const PodcastCard = styled(motion.div)`
  background-color: ${props => props.theme.card || '#f5f5f5'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PodcastImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const PodcastInfo = styled.div`
  padding: 15px;
`;

const PodcastTitle = styled.h3`
  margin: 0 0 10px 0;
  color: ${props => props.theme.text};
`;

const PodcastDescription = styled.p`
  color: ${props => props.theme.textSecondary || '#666'};
  font-size: 0.9rem;
  margin: 0;
`;

const Podcasts = () => {
  const { t } = useTranslation();
  
  // Esempio di dati podcast
  const podcasts = [
    {
      id: 1,
      title: "Morning Show",
      description: "Il meglio del morning show con i nostri DJ",
      image: "/podcasts/morning-show.jpg"
    },
    {
      id: 2,
      title: "Interviste Esclusive",
      description: "Interviste con artisti e personaggi famosi",
      image: "/podcasts/interviews.jpg"
    },
    {
      id: 3,
      title: "Musica Indie",
      description: "Scopri le ultime novità della scena indie",
      image: "/podcasts/indie-music.jpg"
    },
    {
      id: 4,
      title: "Tech Talk",
      description: "Novità e discussioni sul mondo della tecnologia",
      image: "/podcasts/tech-talk.jpg"
    }
  ];
  
  // Animazione per la pagina
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Animazione per le card
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { y: -5, transition: { duration: 0.2 } }
  };
  
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Title>{t('podcasts.title', 'I Nostri Podcast')}</Title>
      
      <PodcastGrid>
        {podcasts.map((podcast, index) => (
          <PodcastCard
            key={podcast.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PodcastImage 
              src={podcast.image} 
              alt={podcast.title}
              onError={(e) => {e.target.src = './podcasts/default-podcast.png'}}
            />
            <PodcastInfo>
              <PodcastTitle>{podcast.title}</PodcastTitle>
              <PodcastDescription>{podcast.description}</PodcastDescription>
            </PodcastInfo>
          </PodcastCard>
        ))}
      </PodcastGrid>
    </PageContainer>
  );
};

export default Podcasts;