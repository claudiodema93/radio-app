import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import mediaStations from '../config/mediaStations';
import SocialMediaService from '../services/socialMedia';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProgramsContainer = styled.div`
  margin: 40px 0;
  position: relative;
`;

const ProgramsTitle = styled.h2`
  color: #e52d27;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ProgramsGrid = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  gap: 20px;
  padding: 10px 0;
`;

const ProgramCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  flex: 0 0 calc(25% - 15px); // 4 elementi per riga
  min-width: 250px;
`;

const ProgramImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: fill;
`;

const ProgramInfo = styled.div`
  padding: 15px;
`;

const ProgramName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const ProgramDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary || '#666'};
  margin-bottom: 10px;
`;

const ListenButton = styled.button`
  background-color: #e52d27;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
`;

// Stili per la sezione dei post di Facebook
const FacebookSection = styled.div`
  margin: 40px 0;
  position: relative;
`;

const FacebookTitle = styled.h2`
  color: #e52d27;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const PostsGrid = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  gap: 20px;
  padding: 10px 0;
`;

const PostCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  flex: 0 0 calc(25% - 15px); // 4 elementi per riga
  min-width: 300px;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const PostInfo = styled.div`
  padding: 15px;
`;

const PostDate = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 8px;
`;

const PostMessage = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary || '#666'};
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreButton = styled.a`
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background-color: #2d4373;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(229, 45, 39, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: ${props => props.hide ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s, opacity 0.3s;
  
  &:hover {
    background-color: rgba(229, 45, 39, 1);
  }
  
  &.facebook {
    background-color: rgba(59, 89, 152, 0.8);
    
    &:hover {
      background-color: rgba(59, 89, 152, 1);
    }
  }
`;

const PrevButton = styled(NavButton)`
  left: -20px;
`;

const NextButton = styled(NavButton)`
  right: -20px;
`;

const Home = ({ setSelectedStation }) => {
  // Utilizziamo i dati da mediaStations.js invece di dati hardcoded
  const programs = mediaStations.map(station => ({
    id: station.id,
    name: station.name,
    description: station.description,
    image: station.logo,
    streamUrl: station.streamUrl,
    type: station.type,
    channelName: station.channelName
  }));

  // Stato per i post di Facebook
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Riferimenti per lo scorrimento
  const programsGridRef = useRef(null);
  const postsGridRef = useRef(null);
  
  // Stato per i pulsanti di navigazione
  const [programsScrollPos, setProgramsScrollPos] = useState(0);
  const [postsScrollPos, setPostsScrollPos] = useState(0);

  // Carica i post di Facebook all'avvio del componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Sostituisci 'antenna.uno' con l'ID della tua pagina Facebook
        const posts = await SocialMediaService.getPagePosts(5);
        setFacebookPosts(posts);
      } catch (error) {
        console.error('Errore nel caricamento dei post Facebook:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Funzioni per lo scorrimento orizzontale dei programmi
  const scrollPrograms = (direction) => {
    if (programsGridRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      programsGridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Aggiorna la posizione di scorrimento
      setTimeout(() => {
        if (programsGridRef.current) {
          setProgramsScrollPos(programsGridRef.current.scrollLeft);
        }
      }, 300);
    }
  };
  
  // Funzioni per lo scorrimento orizzontale dei post
  const scrollPosts = (direction) => {
    if (postsGridRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      postsGridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Aggiorna la posizione di scorrimento
      setTimeout(() => {
        if (postsGridRef.current) {
          setPostsScrollPos(postsGridRef.current.scrollLeft);
        }
      }, 300);
    }
  };
  
  // Gestione degli eventi di scorrimento
  const handleProgramsScroll = () => {
    if (programsGridRef.current) {
      setProgramsScrollPos(programsGridRef.current.scrollLeft);
    }
  };
  
  const handlePostsScroll = () => {
    if (postsGridRef.current) {
      setPostsScrollPos(postsGridRef.current.scrollLeft);
    }
  };
  
  // Aggiungi listener per lo scorrimento
  useEffect(() => {
    const programsGrid = programsGridRef.current;
    const postsGrid = postsGridRef.current;
    
    if (programsGrid) {
      programsGrid.addEventListener('scroll', handleProgramsScroll);
    }
    
    if (postsGrid) {
      postsGrid.addEventListener('scroll', handlePostsScroll);
    }
    
    return () => {
      if (programsGrid) {
        programsGrid.removeEventListener('scroll', handleProgramsScroll);
      }
      
      if (postsGrid) {
        postsGrid.removeEventListener('scroll', handlePostsScroll);
      }
    };
  }, []);

  // Formatta la data in formato italiano
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStationSelect = (program) => {
    // Trova la stazione completa in mediaStations
    const selectedStation = mediaStations.find(station => station.id === program.id);
    if (selectedStation) {
      setSelectedStation(selectedStation);
    }
  };

  // Calcola se i pulsanti di navigazione devono essere disabilitati
  const isProgramsPrevDisabled = programsScrollPos <= 0;
  const isProgramsNextDisabled = programsGridRef.current ? 
    programsScrollPos + programsGridRef.current.clientWidth >= programsGridRef.current.scrollWidth - 10 : false;
  
  const isPostsPrevDisabled = postsScrollPos <= 0;
  const isPostsNextDisabled = postsGridRef.current ? 
    postsScrollPos + postsGridRef.current.clientWidth >= postsGridRef.current.scrollWidth - 10 : false;

  // Stato per controllare se ci sono abbastanza elementi per lo scorrimento
  const [needProgramsScroll, setNeedProgramsScroll] = useState(false);
  const [needPostsScroll, setNeedPostsScroll] = useState(false);

  // Verifica se è necessario lo scorrimento
  useEffect(() => {
    const checkScrollNeeded = () => {
      if (programsGridRef.current) {
        const isScrollNeeded = programsGridRef.current.scrollWidth > programsGridRef.current.clientWidth;
        setNeedProgramsScroll(isScrollNeeded);
      }
      
      if (postsGridRef.current) {
        const isScrollNeeded = postsGridRef.current.scrollWidth > postsGridRef.current.clientWidth;
        setNeedPostsScroll(isScrollNeeded);
      }
    };
    
    // Controlla all'inizio
    checkScrollNeeded();
    
    // Controlla anche al ridimensionamento della finestra
    window.addEventListener('resize', checkScrollNeeded);
    
    return () => {
      window.removeEventListener('resize', checkScrollNeeded);
    };
  }, [programs, facebookPosts]);

  return (
    <>
      <ProgramsContainer>
        <ProgramsTitle>LE RADIO</ProgramsTitle>
        <PrevButton 
          onClick={() => scrollPrograms('left')} 
          hide={!needProgramsScroll || isProgramsPrevDisabled}
        >
          <FaChevronLeft />
        </PrevButton>
        <NextButton 
          onClick={() => scrollPrograms('right')} 
          hide={!needProgramsScroll || isProgramsNextDisabled}
        >
          <FaChevronRight />
        </NextButton>
        <ProgramsGrid ref={programsGridRef}>
          {programs.map(program => (
            <ProgramCard key={program.id}>
              <ProgramImage 
                src={program.image} 
                alt={program.name}
                onError={(e) => {
                  e.target.src = "./logos/default-media.png";
                }}
              />
              <ProgramInfo>
                <ProgramName>{program.name}</ProgramName>
                <ProgramDescription>{program.description}</ProgramDescription>
                <ListenButton onClick={() => handleStationSelect(program)}>Ascolta</ListenButton>
              </ProgramInfo>
            </ProgramCard>
          ))}
        </ProgramsGrid>
      </ProgramsContainer>

      {/* Sezione post di Facebook */}
      <FacebookSection>
        <FacebookTitle>ULTIMI AGGIORNAMENTI</FacebookTitle>
        {loading ? (
          <p>Caricamento post in corso...</p>
        ) : (
          <>
            <PrevButton 
              className="facebook" 
              onClick={() => scrollPosts('left')} 
              hide={!needPostsScroll || isPostsPrevDisabled}
            >
              <FaChevronLeft />
            </PrevButton>
            <NextButton 
              className="facebook" 
              onClick={() => scrollPosts('right')} 
              hide={!needPostsScroll || isPostsNextDisabled}
            >
              <FaChevronRight />
            </NextButton>
            <PostsGrid ref={postsGridRef}>
              {facebookPosts.map(post => (
                <PostCard key={post.id}>
                  {post.full_picture && (
                    <PostImage 
                      src={post.full_picture} 
                      alt="Immagine post Facebook"
                      onError={(e) => {
                        e.target.src = "./logos/default-social.png";
                      }}
                    />
                  )}
                  <PostInfo>
                    <PostDate>{formatDate(post.created_time)}</PostDate>
                    <PostMessage>{post.message}</PostMessage>
                    <ReadMoreButton href={post.permalink_url} target="_blank" rel="noopener noreferrer">
                      Leggi su Facebook
                    </ReadMoreButton>
                  </PostInfo>
                </PostCard>
              ))}
            </PostsGrid>
          </>
        )}
      </FacebookSection>
    </>
  );
};

export default Home;