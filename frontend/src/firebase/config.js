import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const authExp = getAuth(app);

export { app, authExp };
