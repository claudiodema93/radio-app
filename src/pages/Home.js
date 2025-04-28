import React from 'react';
import styled from 'styled-components';
import mediaStations from '../config/mediaStations';

const ProgramsContainer = styled.div`
  margin: 40px 0;
`;

const ProgramsTitle = styled.h2`
  color: #e52d27;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProgramCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  color: #666;
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

  const handleStationSelect = (program) => {
    // Trova la stazione completa in mediaStations
    const selectedStation = mediaStations.find(station => station.id === program.id);
    if (selectedStation) {
      setSelectedStation(selectedStation);
    }
  };

  return (
    <ProgramsContainer>
      <ProgramsTitle>LE RADIO</ProgramsTitle>
      <ProgramsGrid>
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
  );
};

export default Home;