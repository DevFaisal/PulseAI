import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

//Firebase configuration should be in .env file
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

  const LoginUserWithEmailAndPassword = async (email, password, role) => {
    try {
      const checkedRole = await checkRole(email);
      console.log("Given role:", role);
      console.log("Checked role:", checkedRole);
      if (checkedRole !== role) {
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

  const addHospital = async (name, location) => {
    try {
      return await addDoc(collection(fireStore, "hospital"), {
        name,
        location,
      });
    } catch (error) {
      console.error("Error adding hospital:", error);
      throw error;
    }
  };

  // Sign up function

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

      const hospital = await addHospital(hospitalName, address);
      await addDoc(collection(fireStore, "users"), {
        email,
        role,
        hospitalId: hospital.id,
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
        collection(fireStore, `hospital/${user.hospitalId}/patients`),
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
  const createNewDoctor = async (name, specialty, contact, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await addDoc(
        collection(fireStore, `hospital/${user.hospitalId}/doctors`),
        {
          name,
          specialty,
          hospitalId: user.hospitalId,
          contact,
          email,
        }
      );
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

  const getSinglePatient = async (id) => {
    try {
      const patientDoc = await getDoc(
        doc(fireStore, `hospital/${user.hospitalId}/patients/${id}`)
      );
      return patientDoc.data();
    } catch (error) {
      console.error("Error fetching patient:", error);
      throw error;
    }
  };

  // Get list of patients
  const getPatients = async () => {
    try {
      const patientsSnapshot = await getDocs(
        collection(fireStore, `hospital/${user.hospitalId}/patients`)
      );
      const patients = patientsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return patients;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };

  // Get list of doctors
  const getDoctors = async () => {
    try {
      const doctorsSnapshot = await getDocs(
        collection(fireStore, `hospital/${user.hospitalId}/doctors`)
      );
      return doctorsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };

  // Get all hospitals
  const getHospitals = async () => {
    try {
      const hospitalsSnapshot = await getDocs(
        collection(fireStore, "hospital")
      );
      return hospitalsSnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      throw error;
    }
  };

  // Get all patients from all hospitals
  const getAllPatientsFromHospitals = async () => {
    try {
      // Get all hospitals
      const hospitalsSnapshot = await getDocs(
        collection(fireStore, "hospital")
      );

      const allPatients = [];

      // Iterate over each hospital
      for (const hospitalDoc of hospitalsSnapshot.docs) {
        const hospitalId = hospitalDoc.id;

        // Get all patients from the current hospital
        const patientsSnapshot = await getDocs(
          collection(fireStore, `hospital/${hospitalId}/patients`)
        );

        // Add patients to the array
        patientsSnapshot.forEach((patientDoc) => {
          allPatients.push({
            ...patientDoc.data(),
            hospitalId: hospitalId,
            id: patientDoc.id,
          });
        });
      }

      return allPatients;
    } catch (error) {
      console.error("Error fetching patients:", error);
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
        getSinglePatient,
        getPatients,
        getAllPatientsFromHospitals,
        createNewDoctor,
        getHospitals,
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
