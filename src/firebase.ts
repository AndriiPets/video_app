import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmHTI18HaBZpsC3Cv-3Xpk7FJBu1a42IU",
  authDomain: "astrotube-f6d03.firebaseapp.com",
  projectId: "astrotube-f6d03",
  storageBucket: "astrotube-f6d03.appspot.com",
  messagingSenderId: "1064364987354",
  appId: "1:1064364987354:web:93cd3d10047251f2cce6e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export default app;
