// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEUOrD6I9wYD2W0QLhIFhgYYK0Fn_b-os", // Provided by user
  authDomain: "edushare-27d2c.firebaseapp.com",
  projectId: "edushare-27d2c",
  storageBucket: "edushare-27d2c.firebasestorage.app",
  messagingSenderId: "142478738577",
  appId: "1:142478738577:web:a05fd2af3d21fe12616b30",
  measurementId: "G-D7PVTT4QCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
