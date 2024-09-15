// src/services/userService.js
import { fireStore } from "./firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const createUser = async (userData) => {
  return addDoc(collection(fireStore, "users"), userData);
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserById = async (userId) => {
  const userDoc = await getDoc(doc(fireStore, "users", userId));
  return userDoc.data();
};

export const updateUser = async (userId, updatedData) => {
  return updateDoc(doc(fireStore, "users", userId), updatedData);
};

export const deleteUser = async (userId) => {
  return deleteDoc(doc(fireStore, "users", userId));
};
