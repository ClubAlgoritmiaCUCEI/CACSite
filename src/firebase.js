import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGuTMhZblWZXxX_5HLcgpOrFVB7GD6OPI",
  authDomain: "cacsite-d2389.firebaseapp.com",
  databaseURL: "https://cacsite-d2389.firebaseio.com",
  projectId: "cacsite-d2389",
  storageBucket: "cacsite-d2389.appspot.com",
  messagingSenderId: "955823965171",
  appId: "1:955823965171:web:40f5d9fa10fc6ca4960886",
  measurementId: "G-2EZ3Z62XX5"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

// export const publishPost = async (user, post) => {
//     const data = {
//         auth: user,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         content: post.content,
//         comments: [],
//         key: Date.now()
//     }
//     return await firestore.collection('posts').add(data);
// }

export const createUserProfileDocument = async (user, aditionalData) => {
  if (!user) return;

  //Get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the documentfrom that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        photoURL,
        email,
        ...aditionalData
      });
    } catch (err) {
      console.error("Error creating user", err.mesage);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return { uid, ...userDocument.data() };
  } catch (err) {
    console.error("Error feching user", err.mesage);
  }
};
