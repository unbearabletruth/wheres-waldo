import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    orderBy,
    limit
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

async function writeResultToLeaderboard(db, name, time){
  await setDoc(doc(db, "leaderboard", name), {
    name: name,
    time: time,
  });
}

async function getLeaderboard(db) {
  const getLeaderboard = query(collection(db, 'leaderboard'), orderBy("time"), limit(10));
  const leaderboardSnapshot = await getDocs(getLeaderboard);
  const leaderboard = leaderboardSnapshot.docs.map(doc => doc.data())
  return leaderboard;
}

export {db, getCharacters, writeResultToLeaderboard, getLeaderboard};