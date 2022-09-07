import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQUG3u1VykPP-G2rhoKEKjcxf7OkVCV8s",
  authDomain: "react-app-9ab79.firebaseapp.com",
  projectId: "react-app-9ab79",
  storageBucket: "react-app-9ab79.appspot.com",
  messagingSenderId: "691426610711",
  appId: "1:691426610711:web:0c10da42b233eab0c21652",
};

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
