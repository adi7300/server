// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("@firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyDyOl7xPdehce_Xt2kdv9Z2NJjTCU5z9Oc",
  authDomain: "tmb-2024.firebaseapp.com",
  projectId: "tmb-2024",
  storageBucket: "tmb-2024.appspot.com",
  messagingSenderId: "23118961873",
  appId: "1:23118961873:web:bc113edbd0276834ba79f0",
  measurementId: "G-X333R2HJBH",
};

const app = initializeApp(firebaseConfig);
db = getFirestore(app);

module.exports = {db};
