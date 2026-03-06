// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuEOI8MwpTxAv5LFAEgzxQ_j_vldY8j7Y",
  authDomain: "ecommerce-app-df76b.firebaseapp.com",
  projectId: "ecommerce-app-df76b",
  storageBucket: "ecommerce-app-df76b.appspot.com",
  messagingSenderId: "668442069375",
  appId: "1:668442069375:web:acf5aa861a3d769cc7b24a"
};

// initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// get auth instance
export const auth = getAuth(firebaseApp);

// export default firebaseApp لو احتجتي App نفسه
export default firebaseApp;