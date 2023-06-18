import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    getDoc
  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAr6jrn_0lw9GDMCr_K4YtSgp_AhzdoPqU",
    authDomain: "wheres-waldo-211f7.firebaseapp.com",
    projectId: "wheres-waldo-211f7",
    storageBucket: "wheres-waldo-211f7.appspot.com",
    messagingSenderId: "479664896921",
    appId: "1:479664896921:web:523ed9c76205779c283108"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCharacters(db, name) {
    const charDoc = doc(db, 'characters', name);
    const charSnapshot = await getDoc(charDoc);
    if (charSnapshot.exists()) {
        const charCoords = charSnapshot.data();
        return charCoords;
    } else {
        return "No such document!";
    }
}

export {db, getCharacters};