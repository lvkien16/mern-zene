// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-zene.firebaseapp.com",
  projectId: "mern-zene",
  storageBucket: "mern-zene.appspot.com",
  messagingSenderId: "9067758635",
  appId: "1:9067758635:web:fbbaaddc1d1d3853c8d66e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
