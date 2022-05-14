import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCW5in8WBKMngocq3LaxuGaHy1PR9GlZLg",
    authDomain: "noter-app-c2b4d.firebaseapp.com",
    projectId: "noter-app-c2b4d",
    storageBucket: "noter-app-c2b4d.appspot.com",
    messagingSenderId: "666582439814",
    appId: "1:666582439814:web:a2851d8f1fa8e046727e07"
  };

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const modular_firebase_app=initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export const modular_storage=getStorage(modular_firebase_app)
export { auth, provider, storage, db,firebase };