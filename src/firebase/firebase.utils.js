import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC0PFI1ZVfM2wY02UVLRNLn82YAffmA4uU",
    authDomain: "crwn-db-c5d37.firebaseapp.com",
    databaseURL: "https://crwn-db-c5d37.firebaseio.com",
    projectId: "crwn-db-c5d37",
    storageBucket: "",
    messagingSenderId: "334176451050",
    appId: "1:334176451050:web:b1375489bfc49d95"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;