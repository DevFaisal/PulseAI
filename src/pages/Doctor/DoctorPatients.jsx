import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import Select from "react-select";
import codes from "../../lib/icd10_codes.json";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../../components/Inputs/FormInput";

const DoctorPatients = () => {
  const { control, handleSubmit, setValue, reset, watch } = useForm();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPatientId, setEditingPatientId] = useState(null);

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
    reset({
      diagnosis: patient.diagnosis || "",
      note: patient.note || "",
      thresholds: patient.thresholds || {
        blood_pressure: "",
        blood_glucose: "",
        heart_rate: "",
        body_temperature: "",
        oxygen_saturation: "",
        respiratory_rate: "",
      },
      alertEnabled: patient.alertEnabled || false,
      medicines: patient.medicines || [],
      clinicalNotes: patient.clinicalNotes || "",
    });
  };

  const handleSave = async (data) => {
    try {
      const updatedPatient = {
        ...data,
        diagnosed: true,
      };
      await firebase.updatePatient(editingPatientId, updatedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === editingPatientId
            ? { ...patient, ...updatedPatient }
            : patient
        )
      );
      toast.success("Patient updated successfully");
      setEditingPatientId(null); // Exit editing mode
    } catch (error) {
      console.error("Failed to update patient", error);
    }
  };

  const handleCancel = () => {
    setEditingPatientId(null);
  };

  const addMedicine = () => {
    const currentMedicines = watch("medicines") || [];
    setValue("medicines", [...currentMedicines, { name: "", dosage: "" }]);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        Patients Assigned
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-semibold">Loading patients ...</h1>
        </div>
      ) : patients.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-screen">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`border border-gray-300 ${
                patient.diagnosed
                  ? "ring-2 bg-green-100 ring-green-600"
                  : "bg-white"
              } p-6 rounded-sm ring-1 ring-gray-300`}
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
                      {patient.diagnosis?.value || patient.diagnosis || "N/A"}
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
                </tbody>
              </table>

              {editingPatientId === patient.id ? (
                <form onSubmit={handleSubmit(handleSave)}>
                  <label className="block text-gray-700">Diagnosis</label>
                  <Controller
                    name="diagnosis"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={codes.map((c) => ({
                          value: c.code,
                          label: `${c.code} — ${c.description}`,
                        }))}
                        placeholder="Select a diagnosis"
                        className="mt-1 block w-full"
                      />
                    )}
                  />
                  <label className="block text-gray-700 mt-4">
                    Clinical Notes
                  </label>
                  <Controller
                    name="clinicalNotes"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Enter clinical notes"
                        className="block w-full border border-gray-300 p-3 rounded-lg mb-4"
                      />
                    )}
                  />
                  <label className="block text-gray-700 mt-4">
                    Set Thresholds
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(watch("thresholds") || {}).map((key) => (
                      <div className="ring-1 ring-gray-400 bg-white p-1 rounded-md">
                        <label className="block font-bold text-gray-700">
                          {key.replace("_", " ").toUpperCase()}
                        </label>
                        <div className="flex">
                          <Controller
                            key={key}
                            name={`thresholds.${key}.high`}
                            control={control}
                            render={({ field }) => (
                              <>
                                <FormInput
                                  label={"High"}
                                  type="text"
                                  placeholder={key
                                    .replace("_", " ")
                                    .toUpperCase()}
                                  {...field}
                                />
                              </>
                            )}
                          />
                          <Controller
                            key={key}
                            name={`thresholds.${key}.low`}
                            control={control}
                            render={({ field }) => (
                              <>
                                <FormInput
                                  label={"Low"}
                                  type="text"
                                  placeholder={key
                                    .replace("_", " ")
                                    .toUpperCase()}
                                  {...field}
                                />
                              </>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-4">
                    <Controller
                      name="alertEnabled"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          {...field}
                          checked={field.value}
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      )}
                    />
                    <label className="ml-2 text-gray-700">Enable Alerts</label>
                  </div>
                  <label className="block text-gray-700 mt-4">Medicines</label>
                  {watch("medicines")?.map((med, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <Controller
                        name={`medicines.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <FormInput
                            label="Medicine Name"
                            type="text"
                            placeholder="Medicine Name"
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`medicines.${index}.dosage`}
                        control={control}
                        render={({ field }) => (
                          <FormInput
                            label="Dosage"
                            type="text"
                            placeholder="Dosage"
                            {...field}
                          />
                        )}
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
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm mt-4"
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
