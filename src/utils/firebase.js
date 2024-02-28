// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-8c6e0.firebaseapp.com",
  projectId: "netflix-8c6e0",
  storageBucket: "netflix-8c6e0.appspot.com",
  messagingSenderId: "270743248772",
  appId: "1:270743248772:web:5333d5fd269f6ade1fc7d1",
  measurementId: "G-VYFXGFWLL4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth()
