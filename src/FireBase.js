import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCoeWj7KvsWM-fIDwcpab_i7gJCg43OtCo",
  authDomain: "netflix-clone-160bf.firebaseapp.com",
  projectId: "netflix-clone-160bf",
  storageBucket: "netflix-clone-160bf.appspot.com",
  messagingSenderId: "422614496028",
  appId: "1:422614496028:web:352086428f17c52e89c0d9",
  measurementId: "G-2XDYGSP5GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);

export { auth };

export default db;






