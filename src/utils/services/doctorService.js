// src/services/doctorService.js
import { fireStore } from "./firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export const createDoctor = async (doctorData) => {
  return addDoc(collection(fireStore, "doctors"), doctorData);
};

export const deleteDoctor = async (doctorId) => {
  return deleteDoc(doc(fireStore, "doctors", doctorId));
};

export const getDoctors = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "doctors"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDoctorById = async (doctorId) => {
  const doctorDoc = await getDoc(doc(fireStore, "doctors", doctorId));
  return doctorDoc.data();
};
