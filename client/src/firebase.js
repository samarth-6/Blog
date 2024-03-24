// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-8f0b5.firebaseapp.com",
  projectId: "mern-blog-8f0b5",
  storageBucket: "mern-blog-8f0b5.appspot.com",
  messagingSenderId: "831827548654",
  appId: "1:831827548654:web:1566e8d26db2b678cb56ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);