import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const PageContainer = styled(motion.div)`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: ${props => props.theme.text};
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EventCard = styled(motion.div)`
  background-color: ${props => props.theme.card || '#f5f5f5'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EventImage = styled.img`
  width: 30%;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 180px;
  }
`;

const EventInfo = styled.div`
  padding: 20px;
  flex: 1;
`;

const EventTitle = styled.h3`
  margin: 0 0 15px 0;
  color: ${props => props.theme.text};
`;

const EventDescription = styled.p`
  color: ${props => props.theme.textSecondary || '#666'};
  margin: 0 0 15px 0;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.theme.text || '#666'};
  font-size: 0.9rem;
`;

const Events = () => {
  const { t } = useTranslation();
  
  // Esempio di dati eventi
  const events = [
    {
      id: 1,
      title: "Summer Festival",
      description: "Il nostro festival estivo con i migliori artisti del momento. Non perdere l'occasione di vivere una serata indimenticabile con musica dal vivo e intrattenimento.",
      image: "/events/summer-festival.jpg",
      date: "2025-07-15",
      time: "18:00",
      location: "Piazza Duomo, Milano"
    },
    {
      id: 2,
      title: "DJ Night",
      description: "Una notte intera di musica con i nostri DJ. Vieni a ballare con noi fino all'alba con i migliori successi del momento.",
      image: "/events/dj-night.jpg",
      date: "2025-05-20",
      time: "22:00",
      location: "Club Energia, Roma"
    },
    {
      id: 3,
      title: "Concerto Benefico",
      description: "Un concerto speciale il cui ricavato sarà devoluto in beneficenza. Partecipa anche tu a questa iniziativa solidale.",
      image: "/events/charity-concert.jpg",
      date: "2025-06-10",
      time: "20:30",
      location: "Teatro Comunale, Firenze"
    }
  ];
  
  // Formatta la data in modo leggibile
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  // Animazione per la pagina
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Animazione per le card
  const cardVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };
  
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Title>{t('events.title', 'Eventi')}</Title>
      
      <EventsList>
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <EventImage 
              src={event.image} 
              alt={event.title}
              onError={(e) => {e.target.src = './events/default-event.png'}}
            />
            <EventInfo>
              <EventTitle>{event.title}</EventTitle>
              <EventDescription>{event.description}</EventDescription>
              <EventMeta>
                <MetaItem>
                  <FaCalendarAlt /> {formatDate(event.date)}
                </MetaItem>
                <MetaItem>
                  <FaClock /> {event.time}
                </MetaItem>
                <MetaItem>
                  <FaMapMarkerAlt /> {event.location}
                </MetaItem>
              </EventMeta>
            </EventInfo>
          </EventCard>
        ))}
      </EventsList>
    </PageContainer>
  );
};

export default Events;