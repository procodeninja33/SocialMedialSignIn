// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:8080/api/v1/',
  socketUrl: 'http://localhost:8181',

  firebaseConfig: {
    apiKey: 'AIzaSyDk7xQa2XQPwWnbH1PF7Aw0Anq1GSk8_f0',
    authDomain: 'mean-stack-auth-demo.firebaseapp.com',
    databaseURL: 'https://mean-stack-auth-demo.firebaseio.com',
    projectId: 'mean-stack-auth-demo',
    storageBucket: 'mean-stack-auth-demo.appspot.com',
    messagingSenderId: '23081306194',
    appId: '1:23081306194:web:3f7baaad695b0f23'
  },

  instagramConfig: {
    clientId: 'b84ae4e04f11434ea894fb8afad2f27f',
    clientSecret: '81697408caa34bcaaa85b339d4b0431b',
    redirectURL: 'http://localhost:4200/login/',
    accessToken: '1659412852.1677ed0.4b93ac047158465fa5c80ef43687c6e0',
    code: 'bd347062e46145a6a8b61ea7f8835bf4'
  },
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
