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

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();    //get the corresponding data for the reference

    if(!snapShot.exists){     //if the user doesn't exist, create a user in the database
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;