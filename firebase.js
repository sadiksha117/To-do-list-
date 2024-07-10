// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFrk2rvE3o4dFOwwdAKGwl4pHryybJ6jY",
  authDomain: "to-do-app-cd17e.firebaseapp.com",
  projectId: "to-do-app-cd17e",
  storageBucket: "to-do-app-cd17e.appspot.com",
  messagingSenderId: "934838879247",
  appId: "1:934838879247:web:bb4e3afa3d604822e34f7a",
  measurementId: "G-8WD0V558DW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
