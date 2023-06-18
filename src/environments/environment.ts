// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mockedResponses: true,
  firebaseConfig: {
    apiKey: "",
    authDomain: "assistant-237304.firebaseapp.com",
    databaseURL: "https://assistant-237304.firebaseio.com",
    projectId: "assistant-237304",
    storageBucket: "assistant-237304.appspot.com",
    messagingSenderId: "869604397100",
    appId: "1:869604397100:web:70555581642458b9"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
