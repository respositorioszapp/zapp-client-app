// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASEURL: 'https://appewc.com/zapp/zapp-back/public/api/',
  SECONDARY_URL : 'https://zappstore.com.co/nuevo/wp-api',
  firebaseConfig: {
    apiKey: "AIzaSyDa-PwG6r2LrtKHjwRWoB5MgnBoZaYT3Wk",
    authDomain: "zapp-logistica-dev.firebaseapp.com",
    databaseURL: "https://zapp-logistica-dev.firebaseio.com",
    projectId: "zapp-logistica-dev",
    storageBucket: "zapp-logistica-dev.appspot.com",
    messagingSenderId: "408995173697",
    appId: "1:408995173697:web:3cabbfbbf09e3e922ffdc0",
    measurementId: "G-PQS21Z48YG"
  },
  PLAY_AUDIO_ON_REQUEST: true,
  AUDIO_PATH: "./assets/audio/notification.mpeg",
  VERSION_NAME : "1.0.9",
  PLAY_STORE_URL : "https://play.google.com/store/apps/details?id=com.zapp.client.app", 
  payUCredentials : {
    accountId : "512321",
    merchantId : "508029",
    apiKey : "4Vj8eK4rloUd272L48hsrarnUA",
    apiLogin : "pRRXKOl8ikMmt9u",
    publicKey : "PK61i1Luwa198o2040a3167bCn",
    responseUrl : "https://demoewc.tech/payu_response_url.php",
    confirmationUrl : "https://demoewc.tech/payu_confirmation_url.php",
    postUrl : "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu"
  },
  wompiCredentials:{
    publicKey:"pub_test_5Enp6ZKbOWv03quRyb6FRwhIOhC73vi0",
    currency:"COP",
    responseUrl : "https://www.zapplogistica.com/payment-prod/confirm_payment.php",
    confirmationUrl : "https://www.zapplogistica.com/payment-prod/confirm_payment.php",
    postUrl : "https://checkout.wompi.co/p/",
    urlToFind: "https://sandbox.wompi.co/v1/",
    // production: "https://production.wompi.co/v1"
  },
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
