import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAr6jrn_0lw9GDMCr_K4YtSgp_AhzdoPqU",
    authDomain: "wheres-waldo-211f7.firebaseapp.com",
    projectId: "wheres-waldo-211f7",
    storageBucket: "wheres-waldo-211f7.appspot.com",
    messagingSenderId: "479664896921",
    appId: "1:479664896921:web:523ed9c76205779c283108"
  };
  
const app = initializeApp(firebaseConfig);

export default app;