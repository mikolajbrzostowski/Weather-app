export const environment = {
  production: true,
  met: 'https://api.met.no/weatherapi/locationforecast/1.9/',
  firebase: {
    apiKey: 'AIzaSyA_ck0QF-1bj8pew1Aqz9j5DZudwRZfYaM',
    authDomain: 'kotrak-db15c.firebaseapp.com',
    databaseURL: 'https://kotrak-db15c.firebaseio.com',
    projectId: 'kotrak-db15c',
    storageBucket: 'kotrak-db15c.appspot.com',
    messagingSenderId: '671551812829',
    appId: '1:671551812829:web:ebf742bc5f81a7a330d734'
  },
  mailgun: {
    MAILGUN_API_KEY: '622f6508b0d58eb529a08f8580c0697f-a9919d1f-584015ee',
    API_BASE_URL: 'https://api.mailgun.net/v3/',
    DOMAIN: 'sandbox624af51f306748fba783b3cf289db10e.mailgun.org'
  },
  geocode: {
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    accessToken: 'pk.eyJ1Ijoib3Jhc2hpIiwiYSI6ImNrNGhkNmVvazBheTEzbHB3dmh6NW5wcXMifQ.cFGCaic6a6PtSl8u1plZow'
  },
  darksky: {
    url: 'https://api.darksky.net/forecast/',
    key: '4530920e335600921a3950c88a19d53d'
  },
  proxy: 'https://cors-anywhere.herokuapp.com/'
};
