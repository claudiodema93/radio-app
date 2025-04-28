import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaMusic, FaTwitch, FaFilter } from 'react-icons/fa';
import { MdRadio } from 'react-icons/md';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : props.theme.card};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`;

const StationsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  width: 100%;
`;

const StationCard = styled.div`
  background-color: ${props => props.active ? props.theme.primary : props.theme.card};
  color: ${props => props.active ? 'white' : props.theme.text};
  border-radius: 8px;
  padding: 15px;
  width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadow};
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StationLogo = styled.img`
  width: 80%;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
  margin: 0 auto 10px;
  display: block;
  border: 2px solid ${props => props.active ? 'white' : props.theme.primary};
`;

const StationName = styled.h3`
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StationTypeIndicator = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${props => props.type === 'radio' ? '#1DB954' : '#6441A4'};
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
`;

const StationCardWrapper = styled.div`
  position: relative;
`;

const StationSelector = ({ stations, selectedStation, onSelectStation }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  
  // Filtra le stazioni in base al tipo selezionato
  const filteredStations = stations.filter(station => {
    if (filter === 'all') return true;
    return station.type === filter;
  });

  // Gestisce l'errore di caricamento delle immagini
  const handleImageError = (e) => {
    e.target.src = '/radioapp/logos/default-media.png';
  };

  return (
    <SelectorContainer>
      <FilterContainer>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          <FaFilter /> {t('filters.all')}
        </FilterButton>
        <FilterButton 
          active={filter === 'radio'} 
          onClick={() => setFilter('radio')}
        >
          <FaMusic /> {t('filters.radio')}
        </FilterButton>
        <FilterButton 
          active={filter === 'twitch'} 
          onClick={() => setFilter('twitch')}
        >
          <FaTwitch /> {t('filters.twitch')}
        </FilterButton>
      </FilterContainer>

      <StationsGrid>
        {filteredStations.map(station => (
          <StationCardWrapper key={station.id}>
            <StationCard 
              active={selectedStation.id === station.id}
              onClick={() => onSelectStation(station)}
            >
              <StationLogo 
                src={station.logo} 
                alt={station.name} 
                active={selectedStation.id === station.id}
                onError={handleImageError}
              />
              <StationName>{station.name}</StationName>
            </StationCard>
            <StationTypeIndicator type={station.type}>
              {station.type === 'radio' ? <FaMusic  /> : <FaTwitch />}
            </StationTypeIndicator>
          </StationCardWrapper>
        ))}
      </StationsGrid>
    </SelectorContainer>
  );
};

export default StationSelector;