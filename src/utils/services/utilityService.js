// src/services/utilityService.js
import { fireStore } from "./firebaseConfig";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";

export const getHospitalName = async (hospitalId) => {
  const hospitalDoc = await getDoc(doc(fireStore, "hospitals", hospitalId));
  return hospitalDoc.data()?.name;
};

export const getPatientsOfDoctor = async (doctorId) => {
  const querySnapshot = await getDocs(collection(fireStore, "patients"));
  return querySnapshot.docs
    .filter((doc) => doc.data().doctorId === doctorId)
    .map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAllPatientsFromHospitals = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "patients"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
