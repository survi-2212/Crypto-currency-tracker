import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAXjrD35FP2CAKd7srDWKVmP9yYh_dWFPE",
  authDomain: "crypto-currency-app-13eac.firebaseapp.com",
  projectId: "crypto-currency-app-13eac",
  storageBucket: "crypto-currency-app-13eac.appspot.com",
  messagingSenderId: "186558692925",
  appId: "1:186558692925:web:5fdc9c18cbd7ecaece3454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};