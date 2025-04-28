import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaDownload } from 'react-icons/fa';
import { ThemeContext } from '../theme/ThemeContext';

const InstallLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const InstallButton = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Intercetta l'evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Impedisce al browser di mostrare automaticamente il prompt
      e.preventDefault();
      // Salva l'evento per poterlo attivare più tardi
      setDeferredPrompt(e);
      // Aggiorna lo stato per mostrare il pulsante di installazione
      setIsInstallable(true);
    });

    // Gestisce il caso in cui l'app è già installata
    window.addEventListener('appinstalled', () => {
      // L'app è stata installata
      console.log('App installata');
      // Nasconde il pulsante di installazione
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    // Controlla se l'app è già in modalità standalone (già installata)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Mostra il prompt di installazione
    deferredPrompt.prompt();

    // Attende che l'utente risponda al prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Scelta dell'utente: ${outcome}`);

    // Resetta la variabile deferredPrompt poiché non può essere riutilizzata
    setDeferredPrompt(null);

    // Se l'utente ha accettato, nascondi il pulsante
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  // Mostra il pulsante solo se l'app è installabile
  if (!isInstallable) {
    return null;
  }

  return (
    <InstallLink onClick={handleInstallClick}>
      <FaDownload /> {t('controls.installApp')}
    </InstallLink>
  );
};

export default InstallButton;