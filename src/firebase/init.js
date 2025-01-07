import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
*/
const firebaseConfig = {
  apiKey: "AIzaSyDsU2heMX_fy89fl1WjvjHel6O1lFyeuAk",
  authDomain: "sharespace.com.ng",
  projectId: "sharespaceng",
  storageBucket: "sharespaceng.appspot.com",
  messagingSenderId: "579110495977",
  appId: "1:579110495977:web:f4f9f2734bb60c00bdb278",
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
