export const environment = {
  production: true,
  BASEURL: 'https://zappstore.com.co/zapp-back/public/api/',
  SECONDARY_URL : 'https://zappstore.com.co/nuevo/wp-api',
  firebaseConfig: {
    apiKey: "AIzaSyATr-dHHfoI0fz07QM8JrYqlFT23hmONUE",
    authDomain: "zapplogistica-76f1a.firebaseapp.com",
    databaseURL: "https://zapplogistica-76f1a-default-rtdb.firebaseio.com/",
    projectId: "zapplogistica-76f1a",
    storageBucket: "zapplogistica-76f1a.appspot.com",
    messagingSenderId: "109401557615",
    appId: "1:109401557615:web:6c2a68e7e0c5cccd4a9b9a",
    measurementId: "G-S93W4WF67T"
  },
  PLAY_AUDIO_ON_REQUEST: true,
  AUDIO_PATH: "./assets/audio/notification.mpeg",
  VERSION_NAME : "1.0.9.2.9",
  PLAY_STORE_URL : "https://play.google.com/store/apps/details?id=com.zapp.client.app",
  payUCredentials : {
    accountId : "894504",
    merchantId : "888017",
    apiKey : "y1LywvwaKfz1z8G5sLXMtpRmF9",
    apiLogin : "O3m784v7s3pvRv2",
    publicKey : "PK61i1Luwa198o2040a3167bCn",
    responseUrl : "https://demoewc.tech/payu_response_url.php",
    confirmationUrl : "https://demoewc.tech/payu_confirmation_url.php",
    postUrl : "https://checkout.payulatam.com/ppp-web-gateway-payu/"
  },
  wompiCredentials:{
    publicKey:"pub_prod_lGYxHGF1deVzub3xFeFqx4UzemCJdgsj",
    currency:"COP",
    responseUrl : "https://www.zapplogistica.com/payment-prod/confirm_payment.php",
    confirmationUrl : "https://www.zapplogistica.com/payment-prod/confirm_payment.php",
    postUrl : "https://checkout.wompi.co/p/",
    urlToFind: "https://production.wompi.co/v1/",
    // production: "https://production.wompi.co/v1"
  }
};
