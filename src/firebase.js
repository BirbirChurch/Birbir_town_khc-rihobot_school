import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjgsJwUjQ41ogOC_48u58ivrWoO1QSS7c",
  authDomain: "birbir-town-khc-rihobot-school.firebaseapp.com",
  projectId: "birbir-town-khc-rihobot-school",
  storageBucket: "birbir-town-khc-rihobot-school.firebasestorage.app",
  messagingSenderId: "415978050986",
  appId: "1:415978050986:web:fbf5b380bf991f71a947d3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
