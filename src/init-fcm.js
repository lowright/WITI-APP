import * as firebase from "firebase/app";
import "firebase/messaging";
import config from './firebaseConfig';
const initializedFirebaseApp = firebase.initializeApp(config);
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
// Project Settings => Cloud Messaging => Web Push certificates
  "BB-dNkbaa9qWBshmH58NePPJc0yO-UEGrkkFKtzYkoLfoY0O1jsLC6Fgm6MpnkunclTRzxyTwqYkPvTu1LexWqM"
);
export { messaging };
