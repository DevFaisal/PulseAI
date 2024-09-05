import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/Firebase";
import codes from "../../lib/icd10_codes.json";
import Select from "react-select";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [note, setNote] = useState("");

  const firebase = useFirebase();
  const { user } = firebase;

  useEffect(() => {
    const getPatientsOfDoctor = async () => {
      try {
        const patients = await firebase.getPatientsOfDoctor(user.uid);
        setPatients(patients);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch patients for doctor", error);
        setLoading(false);
      }
    };

    if (user) {
      getPatientsOfDoctor();
    }
  }, [firebase, user]);


  const handleEdit = (patient) => {
    setEditingPatientId(patient.id);
    setDiagnosis(patient.diagnosis || "");
    setNote(patient.note || "");
  };
  // Compare this snippet from src/pages/Admin/AdminPatients.jsx:

  const handleSave = async (patientId) => {
    try {
      await firebase.updatePatient(patientId, { diagnosis, note });
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === patientId ? { ...patient, diagnosis, note } : patient
        )
      );
      setEditingPatientId(null); // Exit editing mode
    } catch (error) {
      console.error("Failed to update patient", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Patients Assigned
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading patients...</p>
      ) : patients.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {patient.name}
              </h2>
              <p className="text-gray-600">
                <strong>Age:</strong> {patient.age}
              </p>
              <p className="text-gray-600">
                <strong>Hospital ID:</strong> {patient.hospitalId}
              </p>
              <p className="text-gray-600">
                <strong>Symptoms:</strong> {patient.symptoms}
              </p>

              {/* Diagnosis and Notes Section */}
              {editingPatientId === patient.id ? (
                <div className="mt-4">
                  <label className="block text-gray-700">Diagnosis</label>
                  <Select
                    options={codes.map((c) => ({
                      value: c.code,
                      label: c.code + "--" + c.description,
                    }))}
                    // value={codes.find(
                    //   (c) => c.code === diagnosis.split("--")[0]
                    // )}
                    onChange={(selectedOption) =>
                      setDiagnosis(selectedOption.value)
                    }
                    placeholder="Select a diagnosis"
                    className="mt-1 block w-full"
                  />

                  <label className="block text-gray-700">Note</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <button
                    onClick={() => handleSave(patient.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">
                    <strong>Diagnosis:</strong> {patient.diagnosis || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Note:</strong> {patient.note || "N/A"}
                  </p>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No patients found for this doctor.</p>
      )}
    </div>
  );
};

export default DoctorPatients;
