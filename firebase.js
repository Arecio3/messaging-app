import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmlzq4--ncGPN29GU3kBWHUO7xr0c5a1o",
    authDomain: "hermes-7aea9.firebaseapp.com",
    projectId: "hermes-7aea9",
    storageBucket: "hermes-7aea9.appspot.com",
    messagingSenderId: "939964147687",
    appId: "1:939964147687:web:952000e8e3aeed225ebf42",
    measurementId: "G-HFEKCLVLKN"
  };

  // if we already have an initialized App then use otherwise use the one up above 
  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider }