// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2mCifErA5SRXMH2Krrb6k0kD7oXr7LCA",
  authDomain: "chatapp-c87ee.firebaseapp.com",
  projectId: "chatapp-c87ee",
  storageBucket: "chatapp-c87ee.appspot.com",
  messagingSenderId: "1057658303037",
  appId: "1:1057658303037:web:1162f0331510cf42f6b054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
