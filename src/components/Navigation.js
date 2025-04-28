import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InstallButton from './InstallButton';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { FaHome, FaPodcast, FaCalendarAlt, FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  position: relative;
  width: 100%;
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: ${props => props.theme.primary};
  z-index: 1000;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  box-shadow: ${props => props.isOpen ? '0 0 15px rgba(0, 0, 0, 0.5)' : 'none'};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MenuHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px 0;
`;

const MenuFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
`;

const InstallButtonWrapper = styled.div`
  margin-top: 10px;
`;

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Chiudi il menu quando si fa clic all'esterno
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Blocca lo scrolling del body quando il menu è aperto
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <Nav>
      <MobileHeader>
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>
      </MobileHeader>

      <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
      
      <MobileMenu isOpen={isMenuOpen} ref={menuRef}>
        <MenuHeader>
          <MenuTitle>Radio Antenna 1</MenuTitle>
          <CloseButton onClick={closeMenu}>
            <FaTimes />
          </CloseButton>
        </MenuHeader>
        
        <MenuItems>
          <MenuItem href="#" onClick={closeMenu}>
            <FaHome /> {t('navigation.home')}
          </MenuItem>
          <MenuItem href="#" onClick={closeMenu}>
            <FaPodcast /> {t('navigation.podcasts')}
          </MenuItem>
          <MenuItem href="#" onClick={closeMenu}>
            <FaCalendarAlt /> {t('navigation.events')}
          </MenuItem>
          
          <MenuDivider />
          
          {/* Selettore del tema */}
          <ThemeSelector closeMenu={closeMenu} />
          
          <MenuDivider />
          
          {/* Selettore della lingua */}
          <LanguageSelector closeMenu={closeMenu} />
        </MenuItems>
        
        <MenuFooter>
          <InstallButtonWrapper>
            <InstallButton />
          </InstallButtonWrapper>
        </MenuFooter>
      </MobileMenu>
    </Nav>
  );
};

export default Navigation;