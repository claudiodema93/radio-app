const mediaStations = [
  {
    id: 'antennauno',
    name: 'Antenna Uno',
    description: 'La tua web radio preferita',
    streamUrl: 'https://stream15.top-ix.org/antennauno',
    logo: '/logos/la-radio.jpg',
    type: 'radio'
  },
  {
    id: 'la-melodica',
    name: 'La Melodica',
    description: 'Solo musica italiana',
    streamUrl: 'https://media.streambrothers.com:8118/antenna1napoli',
    logo: '/logos/la-melodica.jpg',
    type: 'radio'
  },
  {
    id: 'la-latina',
    name: 'La Latina',
    description: 'Il ritmo dell\'Italia',
    streamUrl: 'https://radiodeejay-lh.akamaihd.net/i/RadioDeejay_Live_1@189857/master.m3u8',
    logo: '/logos/la-latina.jpg',
    type: 'radio'
  },
  // Canali Twitch
  {
    id: 'web-tv',
    name: 'Web TV',
    description: 'Fumetti, anime e videogiochi',
    channelName: 'radioantenna1',
    logo: '/logos/tv-la-radio.jpg',
    type: 'twitch'
  }
];

export default mediaStations;