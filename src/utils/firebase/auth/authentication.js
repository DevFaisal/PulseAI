import { firebaseAuth } from "../../context/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { fireStore } from "../../context/Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { addHospital } from "../hospitals/hospitalManagement";

// Function to handle user sign-up
const SignUpWithEmailAndPassword = async (
  email,
  password,
  role,
  address,
  hospitalName
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    // Add hospital details
    const hospital = await addHospital(hospitalName, address);

    // Add user details to Firestore
    await addDoc(collection(fireStore, "users"), {
      email,
      role,
      hospitalId: hospital.id,
      hospitalName,
    });

    // Check user role
    const userRole = await checkRole(email);
    if (userRole !== role) {
      throw new Error("Invalid role");
    }

    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Function to handle user login
const LoginUserWithEmailAndPassword = async (email, password, role) => {
  try {
    const userRole = await checkRole(email);
    if (userRole == null) {
      throw new Error("User not found");
    }
    if (userRole !== role) {
      throw new Error("Invalid role");
    }

    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    return userCredential;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Function to check user role
const checkRole = async (email) => {
  try {
    // Fetch all users from Firestore
    const usersSnapshot = await getDocs(collection(fireStore, "users"));
    const userDoc = usersSnapshot.docs.find(
      (doc) => doc.data().email === email
    );

    if (userDoc) {
      const userData = userDoc.data();

      // Returning user role
      return userData.role;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error checking role:", error);
    throw error;
  }
};

// Function to handle user logout
const Logout = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export {
  LoginUserWithEmailAndPassword,
  SignUpWithEmailAndPassword,
  checkRole,
  Logout,
};
