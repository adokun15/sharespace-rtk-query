import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import {
  FIREBASE_APIKEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../lib/utils";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

async function setup_Auth_Emulator(auth) {
  const url = "http://localhost:9092";
  await fetch(url);
  connectAuthEmulator(auth, url);
}

const app_initialized = () => {
  if (getApps().length > 0) {
    const app = getApp();
    if (process.env.NODE_ENV === "development") {
      setup_Auth_Emulator(getAuth(app));
      connectFirestoreEmulator(getFirestore(app), "localhost", 8082);
      //connectStorageEmulator(getStorage(app), "localhost", 9190);
    }
  } else {
    const app = initializeApp(firebaseConfig);

    if (process.env.NODE_ENV === "development") {
      setup_Auth_Emulator(getAuth(app));
      connectFirestoreEmulator(getFirestore(app), "localhost", 8082);
      // connectStorageEmulator(getStorage(app), "localhost", 9190);
    }
  }
};

//Initialize Firebase
export const app = app_initialized();

//authentication;
export const auth = getAuth(app);

//Database
export const db = getFirestore(app);

//storage
export const storage = getStorage(app);

//messaging
export const messaging = async () => (await isSupported()) && getMessaging(app);
