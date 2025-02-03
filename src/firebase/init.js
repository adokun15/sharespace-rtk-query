import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  FIREBASE_APIKEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../lib/utils";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

/*
async function setup_Auth_Emulator(auth) {
  const url = "http://127.0.0.1:9092";
  await fetch(url);
  connectAuthEmulator(auth, url);
}
*/
//Initialize Firebase
export const app = initializeApp(firebaseConfig);

//authentication;
export const auth = getAuth(app);
//setup_Auth_Emulator(auth);

//Database
export const db = getFirestore(app);
//connectFirestoreEmulator(db, "localhost", 8082);

//storage
export const storage = getStorage(app);
//connectStorageEmulator(storage, "localhost", 9192);
