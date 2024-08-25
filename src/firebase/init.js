import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsU2heMX_fy89fl1WjvjHel6O1lFyeuAk",
  authDomain: "sharespaceng.firebaseapp.com",
  projectId: "sharespaceng",
  storageBucket: "sharespaceng.appspot.com",
  messagingSenderId: "579110495977",
  appId: "1:579110495977:web:f4f9f2734bb60c00bdb278",
};

async function setup_Auth_Emulator(auth) {
  const url = "http://127.0.0.1:9099";
  await fetch(url);
  connectAuthEmulator(auth, url);
}

async function setup_db_Emulator(db) {
  const url = "http://127.0.0.1:8080";
  await fetch(url);
  connectFirestoreEmulator(db, url);
}

//Initialize Firebase
export const app = initializeApp(firebaseConfig);

//authentication;
export const auth = getAuth(app);
setup_Auth_Emulator(auth);

//Database
export const db = getFirestore(app);
setup_db_Emulator(db);

//db
