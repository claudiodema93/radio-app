import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa le traduzioni
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';

// Le risorse di traduzione
const resources = {
  it: {
    translation: translationIT
  },
  en: {
    translation: translationEN
  }
};

i18n
  // Rileva la lingua del browser
  .use(LanguageDetector)
  // Passa l'istanza i18n a react-i18next
  .use(initReactI18next)
  // Inizializza i18next
  .init({
    resources,
    fallbackLng: 'it', // Lingua di fallback
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // React gestisce già l'escape
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;