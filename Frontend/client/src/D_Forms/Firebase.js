// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqgWp_gj7Yxh7n5RHQH9b-57-jDZ-Dm08",
    authDomain: "fine-entry-429219-b4.firebaseapp.com",
    projectId: "fine-entry-429219-b4",
    storageBucket: "fine-entry-429219-b4.appspot.com",
    messagingSenderId: "706139975365",
    appId: "1:706139975365:web:31780924a9bb49f1330aac",
    measurementId: "G-CMQFMTQCP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);