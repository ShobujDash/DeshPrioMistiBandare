import { initializeApp } from "firebase/app";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "deshpriomistibander.firebaseapp.com",
  projectId: "deshpriomistibander",
  storageBucket: "deshpriomistibander.firebasestorage.app",
  messagingSenderId: "64448448939",
  appId: "1:64448448939:web:d7503e748d30abdfacaaee",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
