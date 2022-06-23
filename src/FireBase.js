// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY2JoNb4-4PkolFmXutNTHkaNXrKny6bY",
  authDomain: "todo-app-a9c69.firebaseapp.com",
  projectId: "todo-app-a9c69",
  storageBucket: "todo-app-a9c69.appspot.com",
  messagingSenderId: "426388820918",
  appId: "1:426388820918:web:caed8944f75446fac42717",
  measurementId: "G-W8M7Y926ES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
