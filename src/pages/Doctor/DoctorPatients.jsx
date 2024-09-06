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
        console;
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

              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold">Age:</td>
                    <td>{patient.age}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Diagnosis:</td>
                    <td>{patient.diagnosis}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Symptoms:</td>
                    <td>{patient.symptoms}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Hospital ID:</td>
                    <td>{patient.hospitalId}</td>
                  </tr>
                </tbody>
              </table>

              {/* Diagnosis and Notes Section */}
              {editingPatientId === patient.id ? (
                <div className="mt-4">
                  {/* Diagnosis */}
                  <label className="block text-gray-700">Diagnosis</label>
                  <Select
                    options={codes.map((c) => ({
                      value: c.code,
                      label: c.code + "--" + c.description,
                    }))}
                    onChange={(selectedOption) =>
                      setDiagnosis(selectedOption.value)
                    }
                    placeholder="Select a diagnosis"
                    className="mt-1 block w-full"
                  />
                  {/* Clinical Notes */}
                  <label className="block text-gray-700 mt-4">
                    Clinical Notes
                  </label>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  {/* Thresholds */}
                  <label className="block text-gray-700 mt-4">
                    Set Thresholds
                  </label>
                  <input
                    type="number"
                    placeholder="Blood Pressure"
                    value={thresholds.blood_pressure}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        blood_pressure: e.target.value,
                      })
                    }
                    className="block w-full border border-gray-300 p-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Blood Glucose"
                    value={thresholds.blood_glucose}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        blood_glucose: e.target.value,
                      })
                    }
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Heart Rate"
                    value={thresholds.heart_rate}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        heart_rate: e.target.value,
                      })
                    }
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Body Temperature"
                    value={thresholds.body_temperature}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        body_temperature: e.target.value,
                      })
                    }
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Respiratory Rate"
                    value={thresholds.respiratory_rate}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        respiratory_rate: e.target.value,
                      })
                    }
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Oxygen Saturation"
                    value={thresholds.oxygen_saturation}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        respiratory_rate: e.target.value,
                      })
                    }
                    className="block w-full border border-gray-300 p-2 rounded mb-4"
                  />
                  {/* Alert Settings */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={alertEnabled}
                      onChange={(e) => setAlertEnabled(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-gray-700">Enable Alerts</label>
                  </div>
                  {/* Medicines */}
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
                        className="block w-full border border-gray-300 p-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        value={med.dosage}
                        onChange={(e) =>
                          handleMedicineChange(index, "dosage", e.target.value)
                        }
                        className="block w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={addMedicine}
                      className="mt-2 text-blue-500 hover:underline"
                    >
                      + Add Medicine
                    </button>

                    {/* Save Button */}
                    <button
                      onClick={() => handleSave(patient.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td className="font-semibold">Diagnosis:</td>
                        <td className="text-gray-600">
                          {patient.diagnosis || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold whitespace-nowrap text-gray-600">
                          Clinical Notes:
                        </td>
                        <td className="text-gray-600">
                          {patient.clinicalNotes || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Thresholds:
                        </td>
                        <td className="text-gray-600">
                          HR: {patient.thresholds?.heartRate || "N/A"}, BP:{" "}
                          {patient.thresholds?.bloodPressure || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold text-gray-600">
                          Medicines:
                        </td>
                        <td className="text-gray-600">
                          {patient.medicines
                            ?.map((med) => `${med.name} (${med.dosage})`)
                            .join(", ") || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

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
