import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/Firebase";
import Select from "react-select";
import codes from "../../lib/icd10_codes.json";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [note, setNote] = useState("");
  const [thresholds, setThresholds] = useState({
    blood_pressure: "",
    blood_glucose: "",
    heart_rate: "",
    body_temperature: "",
    oxygen_saturation: "",
    respiratory_rate: "",
  });
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [clinicalNotes, setClinicalNotes] = useState("");

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
    setThresholds(
      patient.thresholds || {
        blood_pressure: "",
        blood_glucose: "",
        heart_rate: "",
        body_temperature: "",
        oxygen_saturation: "",
        respiratory_rate: "",
      }
    );
    setAlertEnabled(patient.alertEnabled || false);
    setMedicines(patient.medicines || []);
    setClinicalNotes(patient.clinicalNotes || "");
  };

  const handleSave = async (patientId) => {
    try {
      const updatedPatient = {
        diagnosis,
        note,
        thresholds,
        alertEnabled,
        medicines,
        clinicalNotes,
      };
      await firebase.updatePatient(patientId, updatedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === patientId ? { ...patient, ...updatedPatient } : patient
        )
      );
      setEditingPatientId(null); // Exit editing mode
    } catch (error) {
      console.error("Failed to update patient", error);
    }
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "" }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Patients Assigned
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading patients...</p>
      ) : patients.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border border-gray-300 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {patient.name}
              </h2>

              <table className="table-auto w-full mb-4">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="font-semibold text-gray-700 py-2">Age:</td>
                    <td className="text-gray-600 py-2">{patient.age}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="font-semibold text-gray-700 py-2">
                      Diagnosis:
                    </td>
                    <td className="text-gray-600 py-2">
                      {patient.diagnosis || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="font-semibold text-gray-700 py-2">
                      Symptoms:
                    </td>
                    <td className="text-gray-600 py-2">
                      {patient.symptoms || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="font-semibold text-gray-700 py-2">
                      Hospital ID:
                    </td>
                    <td className="text-gray-600 py-2">
                      {patient.hospitalId || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>

              {editingPatientId === patient.id ? (
                <div className="mt-4">
                  <label className="block text-gray-700">Diagnosis</label>
                  <Select
                    options={codes.map((c) => ({
                      value: c.code,
                      label: `${c.code} — ${c.description}`,
                    }))}
                    onChange={(selectedOption) =>
                      setDiagnosis(selectedOption.value)
                    }
                    placeholder="Select a diagnosis"
                    className="mt-1 block w-full"
                  />
                  <label className="block text-gray-700 mt-4">
                    Clinical Notes
                  </label>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    className="block w-full border border-gray-300 p-3 rounded-lg mb-4"
                  />
                  <label className="block text-gray-700 mt-4">
                    Set Thresholds
                  </label>
                  <div className="space-y-4">
                    {Object.keys(thresholds).map((key) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={key.replace("_", " ").toUpperCase()}
                        value={thresholds[key]}
                        onChange={(e) =>
                          setThresholds({
                            ...thresholds,
                            [key]: e.target.value,
                          })
                        }
                        className="block w-full border border-gray-300 p-3 rounded-lg"
                      />
                    ))}
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      checked={alertEnabled}
                      onChange={(e) => setAlertEnabled(e.target.checked)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-gray-700">Enable Alerts</label>
                  </div>
                  <label className="block text-gray-700 mt-4">Medicines</label>
                  {medicines.map((med, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <input
                        type="text"
                        placeholder="Medicine Name"
                        value={med.name}
                        onChange={(e) =>
                          handleMedicineChange(index, "name", e.target.value)
                        }
                        className="block w-full border border-gray-300 p-3 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        value={med.dosage}
                        onChange={(e) =>
                          handleMedicineChange(index, "dosage", e.target.value)
                        }
                        className="block w-full border border-gray-300 p-3 rounded-lg"
                      />
                    </div>
                  ))}
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={addMedicine}
                      className="text-blue-500 hover:underline"
                    >
                      + Add Medicine
                    </button>
                    <button
                      onClick={() => handleSave(patient.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
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
