import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1e25IRBRrnxFX30ynVmb7kTIuXRt-pR8",
  authDomain: "luxury-hotel-booking.firebaseapp.com",
  projectId: "luxury-hotel-booking",
  storageBucket: "luxury-hotel-booking.firebasestorage.app",
  messagingSenderId: "126545089910",
  appId: "1:126545089910:web:df741a2d421bbbb205d657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it so we can use it elsewhere
export const db = getFirestore(app);