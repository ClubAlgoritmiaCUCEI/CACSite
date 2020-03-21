import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


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

export { firebase };

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () =>
  auth
    .signInWithPopup(googleProvider)
    .catch(e => console.log("Error on sign up with google"));

const githubProvider = new firebase.auth.GithubAuthProvider();
export const signInWithGithub = () => {
  auth.signInWithPopup(githubProvider).catch(e => {
    console.error("Error on sign up with github");
    console.error(e);
  });
};

const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () =>
  auth
    .signInWithPopup(facebookProvider)
    .catch(e => console.log("Error on sign up with facebook", e));

export const signOut = () => auth.signOut();

export const createUserDocumentWithEmailAndPassword = async userData => {
  auth
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(({ user }) => {
      createUserProfileDocument(user, {
        displayName: userData.username,
        name: userData.name,
        lastName: userData.lastName,
        codeForcesUsername: userData.cfUsername,
        vjudgeUsername: userData.vjUsername
      });
    })
    .catch(e => {
      console.error(e);
    });
};

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const getUserDocument = async user => {
  const { uid } = user;
  if (!uid) return null;

  try {
    const userRef = firestore.doc(`users/${uid}`);
    let snapshot = await userRef.get();
    if (!snapshot.exists) {
      await createUserProfileDocument(user);
      snapshot = await userRef.get();
    }
    return { uid, ...snapshot.data() };
  } catch (err) {
    console.error("Error feching user", err);
  }
};

const createUserProfileDocument = async (user, aditionalData) => {
  if (!user) return;

  //Get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the documentfrom that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    console.log("snapshot doesnt exists");
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        photoURL,
        email,
        likes: [],
        saves: [],
        ...aditionalData
      });
    } catch (err) {
      console.error("Error creating user", err.mesage);
      throw new Error("Cannot reach userDocument");
    }
  }
};
