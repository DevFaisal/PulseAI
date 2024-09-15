import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebase, fireStore, firebaseAuth } from "../../context/Firebase"; // Ensure firebaseAuth and fireStore are properly imported
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const createNewDoctor = async (name, specialty, contact, email, password) => {
  const { user } = useFirebase();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    await addDoc(collection(fireStore, `hospital/${user.hospitalId}/doctors`), {
      name,
      specialty,
      hospitalId: user.hospitalId,
      contact,
      email,
    });

    await addDoc(collection(fireStore, "users"), {
      email,
      role: "doctor",
      hospitalId: user.hospitalId,
    });

    return userCredential;
  } catch (error) {
    console.error("Error creating new doctor:", error);
    throw error;
  }
};

const getDoctors = async () => {
  const { user } = useFirebase();
  try {
    const doctorsSnapshot = await getDocs(
      collection(fireStore, `hospital/${user.hospitalId}/doctors`)
    );
    return doctorsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

const getDoctorById = async (id) => {
  const { user } = useFirebase();
  try {
    const doctorDoc = await getDoc(
      doc(fireStore, `hospital/${user.hospitalId}/doctors/${id}`)
    );
    return doctorDoc.data();
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};

const deleteDoctor = async (id) => {
  const { user } = useFirebase();
  try {
    return await deleteDoc(
      doc(fireStore, `hospital/${user.hospitalId}/doctors/${id}`)
    );
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};

const getDoctorByEmail = async (email) => {
  const { user } = useFirebase();
  try {
    const doctorsSnapshot = await getDocs(
      collection(fireStore, `hospital/${user.hospitalId}/doctors`)
    );

    const doctors = doctorsSnapshot.docs.map((doc) => doc.data());
    return doctors.find((doc) => doc.email === email);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};

export {
  createNewDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  getDoctorByEmail,
};
