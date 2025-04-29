import { FACEBOOK_ACCESS_TOKEN, FACEBOOK_PAGE_ID, isDevelopment } from '../config/env';

/**
 * Servizio per l'integrazione con i social media
 */
const SocialMediaService = {
  /**
   * Recupera gli ultimi post di una pagina Facebook
   * @param {string} pageId - L'ID della pagina Facebook
   * @param {number} limit - Il numero massimo di post da recuperare (default: 5)
   * @returns {Promise<Array>} - Array di post
   */
  async getPagePosts(limit = 5) {
    try {
      // In modalità sviluppo, restituisci post di prova
      if (isDevelopment()) {
        return this._getMockPosts(limit);
      }

      if (!FACEBOOK_ACCESS_TOKEN) {
        throw new Error('Token di accesso Facebook non configurato');
      }
      
      const response = await fetch(
        `https://graph.facebook.com/v16.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,full_picture,permalink_url&limit=${limit}&access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Errore API Facebook: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Errore durante il recupero dei post Facebook:', error);
      throw error;
    }
  },

  /**
   * Genera post di prova per l'ambiente di sviluppo
   * @param {number} count - Numero di post da generare
   * @returns {Array} - Array di post di prova
   * @private
   */
  _getMockPosts(count = 5) {
    const mockPosts = [
      {
        id: 'mock_post_1',
        message: 'Oggi in diretta dalle 15:00 alle 18:00 con il nostro DJ Marco! Non mancate! #RadioAntenna1 #Musica',
        created_time: new Date(Date.now() - 3600000).toISOString(),
        full_picture: 'https://picsum.photos/seed/post1/600/400',
        permalink_url: 'https://facebook.com/example/posts/1'
      },
      {
        id: 'mock_post_2',
        message: 'Nuovo concorso! Commentate questo post per vincere 2 biglietti per il concerto di sabato! #Concorso #Musica',
        created_time: new Date(Date.now() - 86400000).toISOString(),
        full_picture: 'https://picsum.photos/seed/post2/600/400',
        permalink_url: 'https://facebook.com/example/posts/2'
      },
      {
        id: 'mock_post_3',
        message: 'Intervista esclusiva con il cantante Mario Rossi, ascoltala sul nostro sito! #Intervista #MarioRossi',
        created_time: new Date(Date.now() - 172800000).toISOString(),
        full_picture: 'https://picsum.photos/seed/post3/600/400',
        permalink_url: 'https://facebook.com/example/posts/3'
      },
      {
        id: 'mock_post_4',
        message: 'Buon compleanno Radio Antenna 1! Oggi festeggiamo 10 anni di trasmissioni! #Compleanno #RadioAntenna1',
        created_time: new Date(Date.now() - 259200000).toISOString(),
        full_picture: 'https://picsum.photos/seed/post4/600/400',
        permalink_url: 'https://facebook.com/example/posts/4'
      },
      {
        id: 'mock_post_5',
        message: 'Nuova playlist disponibile sul nostro sito! Le hit dell\'estate 2023! #Estate #Musica #Playlist',
        created_time: new Date(Date.now() - 345600000).toISOString(),
        full_picture: 'https://picsum.photos/seed/post5/600/400',
        permalink_url: 'https://facebook.com/example/posts/5'
      },
      {
        id: 'mock_post_6',
        message: 'Sondaggio: qual è la vostra canzone preferita del momento? Commentate qui sotto! #Sondaggio #Musica',
        created_time: new Date(Date.now() - 432000000).toISOString(),
        full_picture: 'https://picsum.photos/seed/post6/600/400',
        permalink_url: 'https://facebook.com/example/posts/6'
      }
    ];
    
    // Restituisci il numero richiesto di post
    return mockPosts.slice(0, count);
  }
};

export default SocialMediaService;