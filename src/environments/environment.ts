// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// Get Firebase keys from here: https://console.firebase.google.com/project/market2beta/overview
export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAi79KeFQmrFeG51iWkCWQRCKG396gI5js',
    authDomain: 'market2beta.firebaseapp.com',
    databaseURL: 'https://market2beta.firebaseio.com',
    storageBucket: 'market2beta.appspot.com',
    messagingSenderId: '294130207444'
  }
};