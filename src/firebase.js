// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC83hkCRVRzDHISaPdE-KuysKcv_1J4BFU",
  authDomain: "jaoo-bf374.firebaseapp.com",
  projectId: "jaoo-bf374",
  storageBucket: "jaoo-bf374.firebasestorage.app",
  messagingSenderId: "1019781448003",
  appId: "1:1019781448003:web:d3275761ff54433b3c2ff6",
  measurementId: "G-MMZCCLFZ2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };