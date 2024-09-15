// src/services/patientService.js
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

export const createPatient = async (patientData) => {
  return addDoc(collection(fireStore, "patients"), patientData);
};

export const updatePatient = async (patientId, updatedData) => {
  return updateDoc(doc(fireStore, "patients", patientId), updatedData);
};

export const deletePatient = async (patientId) => {
  return deleteDoc(doc(fireStore, "patients", patientId));
};

export const getPatients = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "patients"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getPatientById = async (patientId) => {
  const patientDoc = await getDoc(doc(fireStore, "patients", patientId));
  return patientDoc.data();
};
