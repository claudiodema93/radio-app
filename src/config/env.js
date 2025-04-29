/**
 * Servizio per la gestione delle variabili d'ambiente
 * Centralizza l'accesso alle variabili d'ambiente e fornisce valori predefiniti
 */

// Configurazione API
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const API_KEY = process.env.REACT_APP_API_KEY || '';

// Token social media
export const FACEBOOK_ACCESS_TOKEN = process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN || '';

// Page id social media
export const FACEBOOK_PAGE_ID = process.env.REACT_APP_FACEBOOK_PAGE_ID || '';

// Ambiente
export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'development';

// Funzione di utilità per verificare se siamo in produzione
export const isProduction = () => ENVIRONMENT === 'production';

// Funzione di utilità per verificare se siamo in sviluppo
export const isDevelopment = () => ENVIRONMENT === 'development';

// Funzione per ottenere tutte le configurazioni (utile per il debug)
export const getAllConfig = () => {
  // Non includere API_KEY o altri dati sensibili qui
  return {
    API_URL,
    ENVIRONMENT,
    IS_PRODUCTION: isProduction(),
  };
};