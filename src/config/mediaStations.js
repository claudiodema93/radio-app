const mediaStations = [
  {
    id: 'antennauno',
    name: 'Antenna Uno',
    description: 'La tua radio preferita',
    streamUrl: 'https://stream15.top-ix.org/antennauno',
    logo: '/radio-app/logos/la-radio.jpg',
    type: 'radio'
  },
  {
    id: 'la-melodica',
    name: 'La Melodica',
    description: 'Solo musica melodica',
    streamUrl: 'https://media.streambrothers.com:8118/antenna1napoli',
    logo: '/radio-app/logos/la-melodica.jpg',
    type: 'radio'
  },
  {
    id: 'la-latina',
    name: 'La Latina',
    description: 'Solo musica latina',
    streamUrl: 'http://media2.streambrothers.com:8258/antenna1latino',
    logo: '/radio-app/logos/la-latina.jpg',
    type: 'radio'
  },
  // Canali Twitch
  {
    id: 'web-tv',
    name: 'Web TV',
    description: 'Guarda la diretta',
    channelName: 'radioantenna1',
    logo: '/radio-app/logos/tv-la-radio.jpg',
    type: 'twitch'
  }
];

export default mediaStations;