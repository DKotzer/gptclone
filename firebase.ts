import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1qmuMrYmhw4GtT8hkpZHFrFn9MHTlkRA",

  authDomain: "chatgptclone-ce83a.firebaseapp.com",

  projectId: "chatgptclone-ce83a",

  storageBucket: "chatgptclone-ce83a.appspot.com",

  messagingSenderId: "841317399055",

  appId: "1:841317399055:web:9303f5f2e3fa9b23dec17a",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
