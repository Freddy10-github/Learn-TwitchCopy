// var clientId = "luz7ktst4nb0p2ur5eee2apvgmf837";
// curl -H "Accept: application/vnd.twitchtv.v5+json" -H "Client-ID: luz7ktst4nb0p2ur5eee2apvgmf837" -X GET "https://api.twitch.tv/kraken/streams/?game=Overwatch"

// https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&client_id=luz7ktst4nb0p2ur5eee2apvgmf837

const clientId = 'luz7ktst4nb0p2ur5eee2apvgmf837';
const limit = 20;
url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&limit=' + limit
https://api.twitch.tv/kraken/streams/?client_id=luz7ktst4nb0p2ur5eee2apvgmf837&game=League%20of%20Legends&limit=20