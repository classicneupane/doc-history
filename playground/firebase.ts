import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
}

const app = getApps()[0] || initializeApp(firebaseConfig);
const firestore = getFirestore()

export {
    app,
    firestore
}