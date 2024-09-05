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
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

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
          id: userDoc.id,
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

  // Get Hospital Name
  const getHospitalName = async (hospitalId) => {
    try {
      const hospitalDoc = await getDoc(
        doc(fireStore, `hospital/${hospitalId}`)
      );
      return hospitalDoc.data().name;
    } catch (error) {
      console.error("Error fetching hospital name:", error);
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

  const getDoctorByEmail = async (email) => {
    try {
      const doctorsSnapshot = await getDocs(
        collection(fireStore, `hospital/${user.hospitalId}/doctors`)
      );
      const doctors = doctorsSnapshot.docs.map((doc) => doc.data());
      const doctor = doctors.find((doc) => doc.email === email);
      return doctor;
    } catch (error) {
      console.error("Error fetching doctor:", error);
      throw error;
    }
  };

  //Get all patient of a doctor mapped
  const getPatientsOfDoctor = async () => {
    try {
      const patientsSnapshot = await getDocs(
        collection(fireStore, `hospital/${user.hospitalId}/patients`)
      );

      const doctorsSnapshot = await getDocs(
        collection(fireStore, `hospital/${user.hospitalId}/doctors`)
      );

      const doctors = doctorsSnapshot.docs.map((doc) => doc.data());
      const doctor = doctors.find((doc) => doc.email === user.email);

      const patients = patientsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      const particularPatients = patients.filter(
        (patient) =>
          patient.doctorAssigned.toLowerCase() === doctor.name.toLowerCase()
      );
      return particularPatients;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  };

  //Delete a patient
  const deletePatient = async (id) => {
    try {
      return await deleteDoc(
        doc(fireStore, `hospital/${user.hospitalId}/patients/${id}`)
      );
    } catch (error) {
      console.error("Error deleting patient:", error);
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

  const createUser = async (name, email, password, role = "user") => {
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
          hospitalId: user.hospitalId,
        }
      );
      const usersTable = await addDoc(collection(fireStore, "users"), {
        email,
        role,
        hospitalId: user.hospitalId,
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

  const updatePatient = async (id, diagnosis, note) => {
    try {
      await updateDoc(
        doc(fireStore, `hospital/${user.hospitalId}/patients/${id}`),
        diagnosis,
        note
      );
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error;
    }
  };
  return (
    <FirebaseContext.Provider
      value={{
        LoginUserWithEmailAndPassword,
        SignUpWithEmailAndPassword,
        isLoggedIn,
        getHospitalName,
        createNewPatient,
        getSinglePatient,
        getPatients,
        getAllPatientsFromHospitals,
        getPatientsOfDoctor,
        createNewDoctor,
        getDoctorByEmail,
        getUsers,
        deletePatient,
        getHospitals,
        getDoctors,
        updatePatient,
        checkRole,
        createUser,
        user,
        Logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
