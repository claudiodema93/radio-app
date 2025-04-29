import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const PageContainer = styled(motion.div)`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: ${props => props.theme.text};
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  color: ${props => props.theme.textSecondary || '#666'};
  font-size: 1.1rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
`;

const MemberCard = styled(motion.div)`
  background-color: ${props => props.theme.card || '#f5f5f5'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const MemberPhoto = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.h3`
  margin: 0 0 5px 0;
  color: ${props => props.theme.text};
`;

const MemberRole = styled.h4`
  margin: 0 0 15px 0;
  color: #e52d27;
  font-weight: 500;
`;

const MemberBio = styled.p`
  color: ${props => props.theme.textSecondary || '#666'};
  margin: 0 0 15px 0;
  flex: 1;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  transition: color 0.2s;
  
  &:hover {
    color: #e52d27;
  }
`;

const TeamSection = styled.div`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  margin: 40px 0 20px;
  color: ${props => props.theme.text};
  text-align: center;
`;

const Team = () => {
  const { t } = useTranslation();
  
  // Dati del team di direzione
  const managementTeam = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "Direttore",
      bio: "Fondatore e direttore di Radio Antenna 1 dal 2010. Con oltre 20 anni di esperienza nel settore radiofonico, Marco ha trasformato una piccola stazione locale in un punto di riferimento per l'informazione e l'intrattenimento.",
      photo: "/team/director.jpg",
      social: {
        facebook: "https://facebook.com/marcorossi",
        instagram: "https://instagram.com/marcorossi",
        linkedin: "https://linkedin.com/in/marcorossi"
      }
    },
    {
      id: 2,
      name: "Laura Bianchi",
      role: "Direttore Artistico",
      bio: "Responsabile della programmazione musicale e dei contenuti artistici. Laura ha un background in produzione musicale e ha lavorato con alcuni dei più grandi artisti italiani.",
      photo: "/team/artistic-director.jpg",
      social: {
        facebook: "https://facebook.com/laurabianchi",
        instagram: "https://instagram.com/laurabianchi",
        twitter: "https://twitter.com/laurabianchi"
      }
    },
    {
      id: 3,
      name: "Giuseppe Verdi",
      role: "Direttore Tecnico",
      bio: "Responsabile di tutte le infrastrutture tecniche della radio. Giuseppe ha una laurea in ingegneria delle telecomunicazioni e si assicura che le nostre trasmissioni siano sempre di alta qualità.",
      photo: "/team/technical-director.jpg",
      social: {
        linkedin: "https://linkedin.com/in/giuseppeverdi",
        twitter: "https://twitter.com/giuseppeverdi"
      }
    }
  ];
  
  // Dati dei conduttori
  const presentersTeam = [
    {
      id: 4,
      name: "Sofia Romano",
      role: "Conduttrice Mattina",
      bio: "Voce del mattino di Radio Antenna 1, Sofia vi accompagna dalle 6:00 alle 10:00 con musica, notizie e buonumore per iniziare la giornata con il piede giusto.",
      photo: "/team/morning-host.jpg",
      social: {
        instagram: "https://instagram.com/sofiaromano",
        facebook: "https://facebook.com/sofiaromano",
        youtube: "https://youtube.com/sofiaromano"
      }
    },
    {
      id: 5,
      name: "Alessandro Marino",
      role: "Conduttore Pomeriggio",
      bio: "Alessandro è con voi ogni pomeriggio dalle 14:00 alle 18:00 con le ultime novità musicali e interviste esclusive agli artisti del momento.",
      photo: "/team/afternoon-host.jpg",
      social: {
        instagram: "https://instagram.com/alessandromarino",
        twitter: "https://twitter.com/alessandromarino"
      }
    },
    {
      id: 6,
      name: "Giulia Ferretti",
      role: "Conduttrice Sera",
      bio: "Dalle 20:00 alle 23:00, Giulia vi accompagna nelle serate con musica rilassante e approfondimenti culturali sui principali eventi della città.",
      photo: "/team/evening-host.jpg",
      social: {
        facebook: "https://facebook.com/giuliaferretti",
        instagram: "https://instagram.com/giuliaferretti"
      }
    },
    {
      id: 7,
      name: "Luca Esposito",
      role: "DJ Weekend",
      bio: "Luca anima i vostri weekend con i migliori mix di musica dance e house. Lo trovate in onda ogni venerdì e sabato dalle 22:00 alle 2:00.",
      photo: "/team/dj-weekend.jpg",
      social: {
        instagram: "https://instagram.com/lucaesposito",
        youtube: "https://youtube.com/lucaesposito"
      }
    }
  ];
  
  // Dati dei giornalisti
  const journalistsTeam = [
    {
      id: 8,
      name: "Francesca Ricci",
      role: "Capo Redattore",
      bio: "Giornalista con 15 anni di esperienza, Francesca coordina la redazione giornalistica e conduce il notiziario principale delle 12:00 e delle 19:00.",
      photo: "/team/chief-editor.jpg",
      social: {
        twitter: "https://twitter.com/francescaricci",
        linkedin: "https://linkedin.com/in/francescaricci"
      }
    },
    {
      id: 9,
      name: "Roberto Conti",
      role: "Giornalista Sportivo",
      bio: "Roberto si occupa di tutte le notizie sportive e conduce il programma 'Tutto Sport' ogni sera dalle 19:30 alle 20:00.",
      photo: "/team/sports-journalist.jpg",
      social: {
        twitter: "https://twitter.com/robertoconti",
        instagram: "https://instagram.com/robertoconti"
      }
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
  
  // Funzione per renderizzare le icone social
  const renderSocialIcons = (social) => {
    return (
      <SocialLinks>
        {social.facebook && (
          <SocialLink href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </SocialLink>
        )}
        {social.twitter && (
          <SocialLink href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </SocialLink>
        )}
        {social.instagram && (
          <SocialLink href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </SocialLink>
        )}
        {social.linkedin && (
          <SocialLink href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialLink>
        )}
        {social.youtube && (
          <SocialLink href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </SocialLink>
        )}
      </SocialLinks>
    );
  };
  
  // Funzione per renderizzare una sezione del team
  const renderTeamSection = (title, members) => {
    return (
      <TeamSection>
        <SectionTitle>{title}</SectionTitle>
        <TeamGrid>
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MemberPhoto 
                src={member.photo} 
                alt={member.name}
                onError={(e) => {e.target.src = './team/default-profile.jpg'}}
              />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
                {renderSocialIcons(member.social)}
              </MemberInfo>
            </MemberCard>
          ))}
        </TeamGrid>
      </TeamSection>
    );
  };
  
  return (
    <PageContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Title>{t('team.title', 'Il Nostro Team')}</Title>
      <Subtitle>
        {t('team.subtitle', 'Scopri le persone che ogni giorno lavorano con passione per portarti la migliore esperienza radiofonica. Un team di professionisti dedicati all\'informazione, all\'intrattenimento e alla musica di qualità.')}
      </Subtitle>
      
      {renderTeamSection(t('team.management', 'Direzione'), managementTeam)}
      {renderTeamSection(t('team.presenters', 'Conduttori'), presentersTeam)}
      {renderTeamSection(t('team.journalists', 'Giornalisti'), journalistsTeam)}
    </PageContainer>
  );
};

export default Team;