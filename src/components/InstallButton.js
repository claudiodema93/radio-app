import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaDownload, FaAppStore, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

const InstallLink = styled(motion.a)`
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
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isPWASupported: false
  });

  useEffect(() => {
    // Rileva il tipo di dispositivo
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Controlla se è un dispositivo mobile
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    // Controlla se è iOS
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    
    // Controlla se è Android
    const isAndroid = /android/i.test(userAgent);
    
    // Controlla se il browser supporta PWA
    const isPWASupported = 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
    
    setDeviceInfo({
      isMobile,
      isIOS,
      isAndroid,
      isPWASupported
    });

    // Intercetta l'evento beforeinstallprompt solo se non è un dispositivo mobile
    // o se è un dispositivo mobile che supporta PWA (alcuni Android)
    if (!isMobile || (isAndroid && isPWASupported)) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Impedisce al browser di mostrare automaticamente il prompt
        e.preventDefault();
        // Salva l'evento per poterlo attivare più tardi
        setDeferredPrompt(e);
        // Aggiorna lo stato per mostrare il pulsante di installazione
        setIsInstallable(true);
      });
    } else if (isMobile) {
      // Se è un dispositivo mobile, mostra comunque il pulsante per lo store
      setIsInstallable(true);
    }

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

  const handleInstallClick = async (e) => {
    const { isIOS, isAndroid, isPWASupported } = deviceInfo;
    
    // Se è iOS, reindirizza all'App Store
    if (isIOS) {
      // Sostituisci con l'URL effettivo dell'app sull'App Store
      window.location.href = 'https://apps.apple.com/app/tua-app-id';
      return;
    }
    
    // Se è Android, reindirizza al Play Store
    if (isAndroid && !isPWASupported) {
      // Sostituisci con l'URL effettivo dell'app sul Play Store
      window.location.href = 'https://play.google.com/store/apps/details?id=tuo.package.id';
      return;
    }
    
    // Altrimenti, usa il prompt PWA se disponibile
    if (deferredPrompt) {
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
    }
  };

  // Mostra il pulsante solo se l'app è installabile
  if (!isInstallable) {
    return null;
  }

  // Determina l'icona e il testo appropriati in base al dispositivo
  let icon = <FaDownload />;
  let text = t('controls.installApp');
  
  if (deviceInfo.isIOS) {
    icon = <FaAppStore />;
    text = t('controls.getOnAppStore') || 'Scarica da App Store';
  } else if (deviceInfo.isAndroid && !deviceInfo.isPWASupported) {
    icon = <FaGooglePlay />;
    text = t('controls.getOnPlayStore') || 'Scarica da Google Play';
  }

  return (
    <InstallLink 
      onClick={handleInstallClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon} {text}
    </InstallLink>
  );
};

export default InstallButton;