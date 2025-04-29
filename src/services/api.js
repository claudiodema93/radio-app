import { API_URL, API_KEY } from '../config/env';

/**
 * Servizio per le chiamate API
 */
const ApiService = {
  /**
   * Esegue una richiesta GET all'API
   * @param {string} endpoint - L'endpoint dell'API
   * @returns {Promise<any>} - La risposta dell'API
   */
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Errore API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      throw error;
    }
  },
  
  /**
   * Esegue una richiesta POST all'API
   * @param {string} endpoint - L'endpoint dell'API
   * @param {object} data - I dati da inviare
   * @returns {Promise<any>} - La risposta dell'API
   */
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Errore API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      throw error;
    }
  }
};

export default ApiService;