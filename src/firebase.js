import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYkp0xZxPJWHBhBPLg1bnRxHpr9sMMIlQ",
  authDomain: "elysium-49d7f.firebaseapp.com",
  projectId: "elysium-49d7f",
  storageBucket: "elysium-49d7f.firebasestorage.app",
  messagingSenderId: "521878089412",
  appId: "1:521878089412:web:a89645925c760d61c0a391"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);