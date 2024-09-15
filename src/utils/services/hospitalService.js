// src/services/hospitalService.js
import { fireStore } from "./firebaseConfig";
import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";

export const addHospital = async (hospitalData) => {
  return addDoc(collection(fireStore, "hospital"), hospitalData);
};

export const getHospitals = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "hospital"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getHospitalById = async (hospitalId) => {
  const hospitalDoc = await getDoc(doc(fireStore, "hospital", hospitalId));
  return hospitalDoc.data();
};
