// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3tZ-qYU70o1NqsNi0TOFUryWHWCH4YHY",
  authDomain: "work-place-dec.firebaseapp.com",
  projectId: "work-place-dec",
  storageBucket: "work-place-dec.appspot.com",
  messagingSenderId: "903709162750",
  appId: "1:903709162750:web:b2b362a827230b849339af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
