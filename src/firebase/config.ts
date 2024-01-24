
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVg0nuMIM9tHZy4U8_NoAH_tVUxGq2cvo",
  authDomain: "niatoai.firebaseapp.com",
  projectId: "niatoai",
  storageBucket: "niatoai.appspot.com",
  messagingSenderId: "743785166801",
  appId: "1:743785166801:web:ffc5062a683d0713c6d2f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);