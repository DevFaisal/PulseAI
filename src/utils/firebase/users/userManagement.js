import { fireStore, firebaseAuth } from "../../context/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../../context/Firebase";

const createUser = async (name, email, password, role = "user") => {
  const { user } = useFirebase();
  try {
    const signUpUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const newUser = await addDoc(
      collection(fireStore, `hospital/${user.hospitalId}/users`),
      {
        name,
        email,
        role,
        hospitalName: user.hospitalName,
        hospitalId: user.hospitalId,
      }
    );
    const usersTable = await addDoc(collection(fireStore, "users"), {
      email,
      role,
      hospitalId: user.hospitalId,
      hospitalName: user.hospitalName,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
const getUsers = async () => {
  try {
    const usersSnapshot = await getDocs(
      collection(fireStore, `hospital/${user.hospitalId}/users`)
    );
    return usersSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const updatePatient = async (id, updatedPatient) => {
  try {
    return await updateDoc(
      doc(fireStore, `hospital/${user.hospitalId}/patients/${id}`),
      {
        ...updatedPatient,
      }
    );
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

export { createUser, getUsers, updatePatient };
