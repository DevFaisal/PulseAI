// import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";

// // Function to add a hospital to the Firestore collection
// const addHospital = async (name, location) => {
//   if (!name || !location) {
//     throw new Error("Both name and location are required to add a hospital.");
//   }
//   try {
//     const hospitalRef = await addDoc(collection(fireStore, "hospital"), {
//       name,
//       location,
//     });
//     return hospitalRef; // Return the document reference for further use, e.g., retrieving the document ID
//   } catch (error) {
//     console.error("Error adding hospital:", error);
//     throw error;
//   }
// };

// // Function to fetch hospital details by ID
// const getHospitalName = async (hospitalId) => {
//   if (!hospitalId) {
//     throw new Error("Hospital ID is required to fetch the hospital.");
//   }
//   try {
//     const hospitalDoc = await getDoc(doc(fireStore, `hospital/${hospitalId}`));
//     if (hospitalDoc.exists()) {
//       return hospitalDoc.data();
//     } else {
//       console.log("Hospital not found");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching hospital name:", error);
//     throw error;
//   }
// };

// // Function to fetch all hospitals
// const getHospitals = async () => {
//   try {
//     const hospitalsSnapshot = await getDocs(collection(fireStore, "hospital"));
//     return hospitalsSnapshot.docs.map((doc) => ({
//       id: doc.id, // Include document ID if needed
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error fetching hospitals:", error);
//     throw error;
//   }
// };

// export { addHospital, getHospitalName, getHospitals };
