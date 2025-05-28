import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const FirebaseConfig = {
  apiKey: "AIzaSyDetumm2NItwv0yfhCAACVxKwNaEJsgOlY",
  authDomain: "blogweb-405b0.firebaseapp.com",
  projectId: "blogweb-405b0",
  storageBucket: "blogweb-405b0.firebasestorage.app",
  messagingSenderId: "402196643536",
  appId: "1:402196643536:web:1d4cbd59c1ccc1a8a428d5",
};

const app = initializeApp(FirebaseConfig);
export const fireDb = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
