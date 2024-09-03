// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaarQ6rhdNZukaBYcMQoLtEV1ya5SSbGI",
  authDomain: "pulseai-3a709.firebaseapp.com",
  projectId: "pulseai-3a709",
  storageBucket: "pulseai-3a709.appspot.com",
  messagingSenderId: "7093040333",
  appId: "1:7093040333:web:6709ee13c545db9443a584",
  measurementId: "G-T78Q41QV0F",
  databaseURL:"https://pulseai-3a709-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
