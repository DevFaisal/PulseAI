// src/services/authService.js
import { firebaseAuth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signUpUser = async (email, password) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const logoutUser = async () => {
  return signOut(firebaseAuth);
};

export const getUserFromAuth = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
