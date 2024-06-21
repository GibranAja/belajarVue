// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAR_irCnBtZXLM9UlzJ7dpJGeFDydOfP0",
  authDomain: "portalberita-404c6.firebaseapp.com",
  projectId: "portalberita-404c6",
  storageBucket: "portalberita-404c6.appspot.com",
  messagingSenderId: "747817298351",
  appId: "1:747817298351:web:3144208de022ccb8d9a75a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth
}