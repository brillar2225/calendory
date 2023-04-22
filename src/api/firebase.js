// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.CALENDORY_API_KEY,
  authDomain: process.env.CALENDORY_AUTH_DOMAIN,
  projectId: process.env.CALENDORY_PROJECT_ID,
  storageBucket: process.env.CALENDORY_STORAGE_BUCKET,
  messagingSenderId: process.env.CALENDORY_MESSAGING_SENDER_ID,
  appId: process.env.CALENDORY_APP_ID,
  measurementId: process.env.CALENDORY_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
