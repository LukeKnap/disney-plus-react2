import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJvejOt_PUk_6xM39klmTYHZ80rFgr2UI",
    authDomain: "disney-lukas.firebaseapp.com",
    projectId: "disney-lukas",
    storageBucket: "disney-lukas.appspot.com",
    messagingSenderId: "1061382964857",
    appId: "1:1061382964857:web:369f9b9a7eb899022b36a8",
    measurementId: "G-JCPYJGS2JX"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage, db, signInWithPopup };


