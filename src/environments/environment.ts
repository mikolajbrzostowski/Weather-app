// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  met: 'https://api.met.no/weatherapi/',
  firebase: {
    apiKey: 'AIzaSyA_ck0QF-1bj8pew1Aqz9j5DZudwRZfYaM',
    authDomain: 'kotrak-db15c.firebaseapp.com',
    databaseURL: 'https://kotrak-db15c.firebaseio.com',
    projectId: 'kotrak-db15c',
    storageBucket: 'kotrak-db15c.appspot.com',
    messagingSenderId: '671551812829',
    appId: '1:671551812829:web:ebf742bc5f81a7a330d734'
  },
  api_url: 'http://localhost:4000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
