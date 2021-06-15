import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

try {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    });
    firebase.auth().useDeviceLanguage();
  }
} catch (error) {
  console.error(`Error in firebase.initializeApp: ${error}`);
}
export default firebase;

export const app = firebase.app();
export const auth = app.auth();
export const firestore = app.firestore();
export const functions = app.functions("asia-northeast1");
