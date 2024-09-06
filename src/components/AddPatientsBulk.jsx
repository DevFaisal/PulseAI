import React, { useState } from "react";
import papaparse from "papaparse";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";

const AddPatientsBulk = () => {
  const [csvFile, setCsvFile] = useState(null);
  const { createNewPatient } = useFirebase();

  const handleBulkUpload = () => {
    if (!csvFile) {
      toast.error("Please upload a CSV file");
      return;
    }

    papaparse.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const patients = result.data;
        for (let patient of patients) {
          const {
            name,
            age,
            gender,
            email,
            phone,
            address,
            insurance_name,
            insurance_id,
            relationship_to_insured,
            doctorAssigned,
          } = patient;

          if (
            !name ||
            !age ||
            !gender ||
            !email ||
            !phone ||
            !address ||
            !insurance_name ||
            !insurance_id ||
            !relationship_to_insured ||
            !doctorAssigned ||
            !symptoms
          ) {
            toast.error("Invalid patient data");
            break;
          }

          try {
            await createNewPatient(patient);
            toast.success(`Added patient ${name}`);
          } catch (error) {
            console.error(`Error adding patient ${name}:`, error);
          }
        }
        toast.success("Bulk upload complete");
      },
    });
  };

  return (
    <div className="bg-white my-4 shadow-md ring-1 ring-gray-300 rounded-lg p-4 overflow-scroll">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Add Patients in Bulk
      </h1>
      <label htmlFor="csvUpload" className="block text-gray-600">
        Upload CSV
      </label>
      <input
        onChange={(e) => setCsvFile(e.target.files[0])}
        className="border border-gray-300 rounded-md w-full px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        type="file"
        id="csvUpload"
      />
      <div className="flex flex-col p-3">
        <p className="text-sm text-gray-500">
          Please upload a CSV file with the following columns:{" "}
          <span className="text-slate-600">
            name, age, gender, email, phone, address, insurance_name,
            insurance_id, relationship_to_insured, doctorAssigned, symptoms
          </span>
        </p>
        <div className="text-red-600 font-semibold text-xs">
          Note:{" "}
          <p>1. The columns should be in the same order as mentioned above</p>
          <p>
            2. The doctorAssigned Name should be the same as in the database
            maintain the Case Sensitivity
          </p>
        </div>
      </div>
      <button
        onClick={handleBulkUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow mt-4"
      >
        Upload CSV
      </button>
    </div>
  );
};

export default AddPatientsBulk;
