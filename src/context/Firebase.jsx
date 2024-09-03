import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";


const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyBaarQ6rhdNZukaBYcMQoLtEV1ya5SSbGI",
  authDomain: "pulseai-3a709.firebaseapp.com",
  projectId: "pulseai-3a709",
  storageBucket: "pulseai-3a709.appspot.com",
  messagingSenderId: "7093040333",
  appId: "1:7093040333:web:6709ee13c545db9443a584",
  measurementId: "G-T78Q41QV0F",
  databaseURL:
    "https://pulseai-3a709-default-rtdb.asia-southeast1.firebasedatabase.app/",
};


export const useFirebase = () => useContext(FirebaseContext);


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);

export const FirebaseProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    role: "",
    hospitalId: "",
    hospitalName: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        checkRole(user.email); 
      } else {
        setIsLoggedIn(false);
        setUser({ email: "", role: "", hospitalId: "", hospitalName: "" }); 
      }
    });

    return () => unsubscribe();
  }, []);

  const LoginUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      checkRole(email); // Call checkRole after successful login
      return userCredential;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Sign up function
  const SignUpWithEmailAndPassword = async (
    email,
    password,
    role,
    hospitalId,
    hospitalName
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await addDoc(collection(fireStore, "users"), {
        email,
        role,
        hospitalId,
        hospitalName,
      });
      checkRole(email);
      return userCredential;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Logout function
  const Logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // Check user's role and set user data
  const checkRole = async (email) => {
    try {
      const usersSnapshot = await getDocs(collection(fireStore, "users"));
      const userDoc = usersSnapshot.docs.find(
        (doc) => doc.data().email === email
      );
      if (userDoc) {
        const userData = userDoc.data();

        setUser({
          email: userData.email,
          role: userData.role,
          hospitalId: userData.hospitalId,
          hospitalName: userData.hospitalName,
        });
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

  // Create a new patient
  const createNewPatient = async (
    name,
    age,
    doctorAssigned,
    symptoms,
    diagnosis
  ) => {
    try {
      return await addDoc(
        collection(fireStore, `Hospital/${user.hospitalId}/patients`),
        {
          name,
          age,
          doctorAssigned,
          hospitalId: user.hospitalId,
          symptoms,
          diagnosis,
        }
      );
    } catch (error) {
      console.error("Error creating new patient:", error);
      throw error;
    }
  };

  // Create a new doctor
  const createNewDoctor = async (name, specialty, contact, email) => {
    try {
      return await addDoc(
        collection(fireStore, `Hospital/${user.hospitalId}/doctors`),
        {
          name,
          specialty,
          hospitalId: user.hospitalId,
          contact,
          email,
        }
      );
    } catch (error) {
      console.error("Error creating new doctor:", error);
      throw error;
    }
  };

  // Get list of patients
  const getPatients = async () => {
    try {
      const patientsSnapshot = await getDocs(
        collection(fireStore, `Hospital/${user.hospitalId}/patients`)
      );
      return patientsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };

  // Get list of doctors
  const getDoctors = async () => {
    try {
      const doctorsSnapshot = await getDocs(
        collection(fireStore, `Hospital/${user.hospitalId}/doctors`)
      );
      return doctorsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };

  // Get all patients from all hospitals
  const getAllPatientsFromHospitals = async () => {
    try {
      // Get all hospitals
      const hospitalsSnapshot = await getDocs(
        collection(fireStore, "Hospital")
      );

      const patients = [];

      // Iterate over each hospital
      for (const hospitalDoc of hospitalsSnapshot.docs) {
        const hospitalId = hospitalDoc.id;
        console.log("Hospital ID", hospitalId);

        // Get all patients from the current hospital
        const patientsSnapshot = await getDocs(
          collection(fireStore, `Hospital/${hospitalId}/patients`)
        );

        // Add patients to the array
        patientsSnapshot.forEach((patientDoc) => {
          patients.push({
            ...patientDoc.data(),
            hospitalId: hospitalId,
          });
        });
      }

      return patients;
    } catch (error) {
      console.error("Error getting patients:", error);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        LoginUserWithEmailAndPassword,
        SignUpWithEmailAndPassword,
        isLoggedIn,
        createNewPatient,
        getPatients,
        getAllPatientsFromHospitals,
        createNewDoctor,
        getDoctors,
        checkRole,
        user,
        Logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
