import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC83hkCRVRzDHISaPdE-KuysKcv_1J4BFU",
  authDomain: "jaoo-bf374.firebaseapp.com",
  projectId: "jaoo-bf374",
  storageBucket: "jaoo-bf374.appspot.com",
  messagingSenderId: "1019781448003",
  appId: "1:1019781448003:web:d3275761ff54433b3c2ff6",
  measurementId: "G-MMZCCLFZ2Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };