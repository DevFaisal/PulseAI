import { addDoc, collection } from "firebase/firestore";
import { fireStore, useFirebase } from "../../context/Firebase";

const createNewPatient = async (data) => {
  const { user } = useFirebase();
  const token = Math.random().toString(36).substring(7);
  try {
    return await addDoc(
      collection(fireStore, `hospital/${user.hospitalId}/patients`),
      {
        name: data.name,
        age: data.age,
        gender: data.gender,
        contact_info: {
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
        insurance_info: {
          insurance_name: data.insurance_name,
          insurance_id: data.insurance_id,
          holder_name: data.name,
          relationship_to_insured: data.relationship_to_insured,
        },
        vitals: {
          //This data will be get from the device but for now we are using dummy data
          blood_pressure: {
            systolic: data.blood_pressure.split("/")[0],
            diastolic: data.blood_pressure.split("/")[1],
            unit: "mmHg",
            timestamp: Date.now(),
            status: "Normal",
          },
          blood_glucose: {
            level: data.blood_glucose,
            unit: "mmol/L",
            timestamp: Date.now(),
            status: "Normal",
          },
          heart_rate: {
            bpm: data.heart_rate,
            timestamp: Date.now(),
            status: "Normal",
          },
          body_temperature: {
            temperature: data.body_temperature,
            unit: "°C",
            timestamp: Date.now(),
            status: "Normal",
          },
          oxygen_saturation: {
            spO2: data.oxygen_saturation,
            unit: "%",
            timestamp: Date.now(),
            status: "Normal",
          },
          respiratory_rate: {
            rate: data.respiratory_rate,
            unit: "breaths/min",
            timestamp: Date.now(),
            status: "Normal",
          },
        },
        thresholds: {
          blood_pressure: {
            high: data.blood_pressure_threshold_high,
            low: data.blood_pressure_threshold_low,
          },
          blood_glucose: {
            high: data.blood_glucose_threshold_high,
            low: data.blood_glucose_threshold_low,
          },
          heart_rate: {
            high: data.heart_rate_threshold_high,
            low: data.heart_rate_threshold_low,
          },
          body_temperature: {
            high: data.body_temperature_threshold_high,
            low: data.body_temperature_threshold_low,
          },
          oxygen_saturation: {
            high: data.oxygen_saturation_threshold_high,
            low: data.oxygen_saturation_threshold_low,
          },
          respiratory_rate: {
            high: data.respiratory_rate_threshold_high,
            low: data.respiratory_rate_threshold_low,
          },
        },
        doctorAssigned: data.doctorAssigned,
        hospitalId: user.hospitalId,
        symptoms: data.symptoms,
        token: token,
      }
    );
  } catch (error) {
    console.error("Error creating new patient:", error);
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
//TODO::: For Root User
const getAllPatientsFromHospitals = async () => {
  try {
    // Get all hospitals
    const hospitalsSnapshot = await getDocs(collection(fireStore, "hospital"));

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

export {
  createNewPatient,
  getSinglePatient,
  getPatients,
  deletePatient,
  getPatientsOfDoctor,
  getAllPatientsFromHospitals,
};
