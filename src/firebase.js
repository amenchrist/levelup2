// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCACFuEx5oBgl8iZA74ueQAZ4EmVIvaXTA",
  authDomain: "level-up-cdf58.firebaseapp.com",
  projectId: "level-up-cdf58",
  storageBucket: "level-up-cdf58.appspot.com",
  messagingSenderId: "1018506159630",
  appId: "1:1018506159630:web:e44a42f12af5c0f355fe5f",
  measurementId: "G-T9N1F37SVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

