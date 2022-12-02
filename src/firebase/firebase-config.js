import { FirebaseError, initializeApp } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection } from "firebase/firestore";

let firebaseConfig;

if (process.env.NODE_ENV === "test") {
  firebaseConfig = {
    apiKey: process.env.VITE_APIKEY,
    authDomain: process.env.VITE_AUTHDOMAIN,
    projectId: process.env.VITE_PROJECTID,
    storageBucket: process.env.VITE_STORAGEBUCKET,
    messagingSenderId: process.env.VITE_MESSAGINGSENDERID,
    appId: process.env.VITE_APPID,
  };
} else {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
  };
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const googleAuthProvider = new GoogleAuthProvider();

export {
  doc,
  db,
  collection,
  googleAuthProvider,
  signInWithPopup,
  auth,
  createUserWithEmailAndPassword,
};
