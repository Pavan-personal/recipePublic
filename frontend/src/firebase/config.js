import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTVAgNbaHvgVrPg1gw15FdUTLRKhuYWEc",
  authDomain: "my-assignment-auth.firebaseapp.com",
  projectId: "my-assignment-auth",
  storageBucket: "my-assignment-auth.appspot.com",
  messagingSenderId: "627966424638",
  appId: "1:627966424638:web:24f7f48e45f790ad20836f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const authExp = getAuth(app);

export { app, authExp };
