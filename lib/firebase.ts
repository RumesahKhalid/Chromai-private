// lib/firebase.ts
import * as SecureStore from "expo-secure-store";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";


// ↓ apna Firebase config yahan paste karo
const firebaseConfig = {
  apiKey: "AIzaSyAs3U8RHDxxck2wauTfTZ1uR5EE9oBsNGk",
  authDomain: "chromai-auth-bcf52.firebaseapp.com",
  databaseURL: "https://chromai-auth-bcf52-default-rtdb.firebaseio.com",
  projectId: "chromai-auth-bcf52",
  storageBucket: "chromai-auth-bcf52.appspot.com",
  messagingSenderId: "894448613788",
  appId: "1:894448613788:web:b91ddbc2d2945dd7a9b059",
  measurementId: "G-KCF2MH582D"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// React Native me auth persistence explicitly set karna parta
const auth =
  getApps().length
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(SecureStore),
      });

export { app, auth };

