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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();  //used to group all our calls together into one big request, incase our request is stopped halfway

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc(); //get a new document reference in this collection and randomly generate the ID (documents at an empty string)
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();  //return null
};

//Array of objects -> map with routing property
//param: collectionSnapshot
export const convertCollectionsSnapshotToMap = collections => {
    
    const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
  
    return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });

    //make collection.title.toLowerCase() as index, and collection value as the value
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
} 

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;