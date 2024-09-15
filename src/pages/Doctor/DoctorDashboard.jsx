import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/FirebaseContext";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);

  const firebase = useFirebase();
  const { user } = firebase;

  useEffect(() => {
    const getPatientsOfDoctor = async () => {
      try {
        const patients = await firebase.getPatientsOfDoctor(user.uid);
        setPatients(patients);
      } catch (error) {
        console.error("Failed to fetch patients for doctor", error);
      }
    };

    if (user) {
      getPatientsOfDoctor();
    }
  }, [firebase, user]);
  return (
    <div>
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-sm ring-1 ring-gray-300 p-6">
          <h2 className="text-md md:text-2xl font-semibold text-gray-700 mb-4">
            Total Patients Assigned
          </h2>
          <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
        </div>
      </div>

      {/* Patients List Section */}
      <div className="bg-white  rounded-sm ring-1 ring-gray-300 p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Assigned Patients
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border border-gray-300 p-4 rounded-sm ring-1 ring-gray-300"
            >
              <h2 className="text-xl font-semibold text-sky-800 mb-2">
                {patient.name}
              </h2>
              <p className="text-gray-600">
                <strong>Age:</strong> {patient.age}
              </p>
              <p className="text-gray-600">
                <strong>Symptoms:</strong> {patient.symptoms}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
