import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
// } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCdT0wBoBNUMwJY4Yg2zFk5tDwee8phyqE",
  authDomain: "visitbangladesh-b47da.firebaseapp.com",
  projectId: "visitbangladesh-b47da",
  storageBucket: "visitbangladesh-b47da.appspot.com",
  messagingSenderId: "619018236140",
  appId: "1:619018236140:web:a97ae23b7bee07aba3f5c9",
  measurementId: "G-8D11CQ6GFG",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log("logged in user using Google Authentication is : ", user);
    return { user: user, status: "success" };
  } catch (err) {
    // console.error(err);
    // alert(err.message);
    return { user: null, status: err.message };
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("logged in user with email and password : ", res.user);
    return { user: res.user, status: "success" };
  } catch (err) {
    console.error(err);
    // alert(err.message);
    return { user: null, status: err.message };
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("registered user using email and password is : ", user);
    return { user: user, status: "success" };
  } catch (err) {
    console.error(err);
    // alert(err.message);
    return { user: null, status: err.message };
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  // db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
