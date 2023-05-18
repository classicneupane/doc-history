import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    authDomain: 'freelancer-brian-b.firebaseapp.com',
    databaseURL: 'https://freelancer-brian-b-default-rtdb.firebaseio.com',
    projectId: 'freelancer-brian-b',
    storageBucket: 'freelancer-brian-b.appspot.com',
    messagingSenderId: '149556519970',
    appId: '1:149556519970:web:18c6bc034bd61c9049167b',
    measurementId: 'G-WQ943MB4FW'
}

const app = getApps()[0] || initializeApp(firebaseConfig);
const firestore = getFirestore()

export {
    app,
    firestore
}