import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbm-MeJlmLpKpI7W2xKvOz4Z8kEhPtML0",
  authDomain: "atmos-auth.firebaseapp.com",
  projectId: "atmos-auth",
  storageBucket: "atmos-auth.firebasestorage.app",
  messagingSenderId: "777863754646",
  appId: "1:777863754646:web:2ec2018a4b6ef87e59e3b7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
