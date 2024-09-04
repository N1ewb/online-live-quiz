// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM53z3gv53kq1IZQ791oJh2sQAzbX7w6g",
  authDomain: "online-live-quiz.firebaseapp.com",
  projectId: "online-live-quiz",
  storageBucket: "online-live-quiz.appspot.com",
  messagingSenderId: "138890121383",
  appId: "1:138890121383:web:872334d3a16cf415eb0b82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const assessmentCollectionRef = collection(db, "Assessment");
