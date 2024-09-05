import React, { useState } from "react";
import papaparse from "papaparse";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";

const AddPatientsBulk = () => {
  const [csvFile, setCsvFile] = useState(null);
  const { createNewPatient } = useFirebase();

  const handleBulkUpload = () => {
    if (!csvFile) {
      alert("Please upload a CSV file");
      return;
    }

    papaparse.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const patients = result.data;
        for (let patient of patients) {
          const { name, age, doctorAssigned, symptoms } = patient;

          if (!name || !age || !doctorAssigned || !symptoms) {
            console.error("Skipping invalid patient data:", patient);
            continue;
          }

          try {
            await createNewPatient(name, age, doctorAssigned, symptoms);
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
    <div className="bg-white shadow-md ring-1 ring-gray-300 rounded-lg p-4 overflow-scroll">
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
      <div>
        <p className="text-sm p-2 text-gray-500">
          CSV file should have the following columns: name, age, doctorAssigned,
          symptoms
        </p>
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
