import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: PROCESS.ENV.FIREBASE_API_KEY,
  authDomain: PROCESS.ENV.FIREBASE_AUTH_DOMAIN,
  projectId: PROCESS.ENV.FIREBASE_PROJECTID,
  storageBucket: PROCESS.ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PROCESS.ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: PROCESS.ENV.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);