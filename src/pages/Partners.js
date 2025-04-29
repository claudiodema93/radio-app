import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PageContainer = styled(motion.div)`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: ${props => props.theme.text};
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const PartnerCard = styled(motion.div)`
  background-color: ${props => props.theme.card || '#f5f5f5'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const PartnerLogo = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  padding: 20px;
  background-color: white;
`;

const PartnerInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PartnerName = styled.h3`
  margin: 0 0 15px 0;
  color: ${props => props.theme.text};
`;

const PartnerDescription = styled.p`
  color: ${props => props.theme.textSecondary || '#666'};
  margin: 0 0 15px 0;
  flex: 1;
`;

const PartnerLink = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.primary};
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: 500;
  align-self: flex-start;
  
  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const Partners = () => {
  const { t } = useTranslation();
  
  // Esempio di dati partner
  const partners = [
    {
      id: 1,
      name: "Sponsor Principale",
      description: "Il nostro sponsor principale che supporta tutte le nostre trasmissioni e eventi speciali.",
      logo: "/partners/sponsor1.jpg",
      website: "https://www.sponsorprincipale.it"
    },
    {
      id: 2,
      name: "Media Partner",
      description: "Partner mediatico che ci aiuta a promuovere i nostri contenuti su diverse piattaforme.",
      logo: "/partners/media-partner.jpg",
      website: "https://www.mediapartner.it"
    },
    {
      id: 3,
      name: "Sponsor Tecnico",
      description: "Fornitore di attrezzature tecniche per le nostre trasmissioni radio e streaming.",
      logo: "/partners/tech-sponsor.jpg",
      website: "https://www.sponsortecnico.it"
    },
    {
      id: 4,
      name: "Partner Locale",
      description: "Attività locale che collabora con noi per eventi e iniziative sul territorio.",
      logo: "/partners/local-partner.jpg",
      website: "https://www.partnerlocale.it"
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
      <Title>{t('partners.title', 'I Nostri Partners')}</Title>
      
      <PartnersGrid>
        {partners.map((partner, index) => (
          <PartnerCard
            key={partner.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PartnerLogo 
              src={partner.logo} 
              alt={partner.name}
              onError={(e) => {e.target.src = './partners/default-partner.png'}}
            />
            <PartnerInfo>
              <PartnerName>{partner.name}</PartnerName>
              <PartnerDescription>{partner.description}</PartnerDescription>
              <PartnerLink href={partner.website} target="_blank" rel="noopener noreferrer">
                Visita il sito
              </PartnerLink>
            </PartnerInfo>
          </PartnerCard>
        ))}
      </PartnersGrid>
    </PageContainer>
  );
};

export default Partners;