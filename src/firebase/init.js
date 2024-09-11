import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsU2heMX_fy89fl1WjvjHel6O1lFyeuAk",
  authDomain: "sharespaceng.firebaseapp.com",
  projectId: "sharespaceng",
  storageBucket: "sharespaceng.appspot.com",
  messagingSenderId: "579110495977",
  appId: "1:579110495977:web:f4f9f2734bb60c00bdb278",
};

//async function setup_Auth_Emulator(auth) {
//  const url = "http://127.0.0.1:9091";
//  await fetch(url);
// connectAuthEmulator(auth, url);
//}

//Initialize Firebase
export const app = initializeApp(firebaseConfig);

//authentication;
export const auth = getAuth(app);
//setup_Auth_Emulator(auth);

//Database
export const db = getFirestore(app);
//connectFirestoreEmulator(db, "localhost", 8081);

//storage
export const storage = getStorage(app);
//connectStorageEmulator(storage, "localhost", 9191);
