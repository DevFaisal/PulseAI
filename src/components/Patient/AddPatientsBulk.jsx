import React, { useState } from "react";
import papaparse from "papaparse";
import { useFirebase } from "../../context/FirebaseContext";
import toast from "react-hot-toast";

const AddPatientsBulk = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createNewPatient } = useFirebase();

  const handleBulkUpload = () => {
    if (!csvFile) {
      toast.error("Please upload a CSV file");
      return;
    }

    setLoading(true);

    papaparse.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const patients = result.data;
        let uploadErrors = false;

        for (const [index, patient] of patients.entries()) {
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
            blood_pressure,
            blood_glucose,
            heart_rate,
            body_temperature,
            oxygen_saturation,
            respiratory_rate,
            blood_pressure_threshold_high,
            blood_pressure_threshold_low,
            blood_glucose_threshold_high,
            blood_glucose_threshold_low,
            heart_rate_threshold_high,
            heart_rate_threshold_low,
            body_temperature_threshold_high,
            body_temperature_threshold_low,
            oxygen_saturation_threshold_high,
            oxygen_saturation_threshold_low,
            respiratory_rate_threshold_high,
            respiratory_rate_threshold_low,
            doctorAssigned,
            symptoms,
          } = patient;

          // // Validate mandatory fields
          // if (
          //   !name ||
          //   !age ||
          //   !gender ||
          //   !email ||
          //   !phone ||
          //   !address ||
          //   !insurance_name ||
          //   !insurance_id ||
          //   !relationship_to_insured ||
          //   !blood_pressure ||
          //   !blood_glucose ||
          //   !heart_rate ||
          //   !body_temperature ||
          //   !oxygen_saturation ||
          //   !respiratory_rate ||
          //   !blood_pressure_threshold_high ||
          //   !blood_pressure_threshold_low ||
          //   !blood_glucose_threshold_high ||
          //   !blood_glucose_threshold_low ||
          //   !heart_rate_threshold_high ||
          //   !heart_rate_threshold_low ||
          //   !body_temperature_threshold_high ||
          //   !body_temperature_threshold_low ||
          //   !oxygen_saturation_threshold_high ||
          //   !oxygen_saturation_threshold_low ||
          //   !respiratory_rate_threshold_high ||
          //   !respiratory_rate_threshold_low ||
          //   !doctorAssigned ||
          //   !symptoms
          // ) {
          //   toast.error(`Invalid data in row ${index + 1}`);
          //   uploadErrors = true;
          //   continue;
          // }

          try {
            await createNewPatient({
              ...patient,
              age: Number(age),
              blood_glucose: Number(blood_glucose),
              heart_rate: Number(heart_rate),
              body_temperature: Number(body_temperature),
              oxygen_saturation: Number(oxygen_saturation),
              respiratory_rate: Number(respiratory_rate),
              blood_glucose_threshold_high: Number(
                blood_glucose_threshold_high
              ),
              blood_glucose_threshold_low: Number(blood_glucose_threshold_low),
              heart_rate_threshold_high: Number(heart_rate_threshold_high),
              heart_rate_threshold_low: Number(heart_rate_threshold_low),
              body_temperature_threshold_high: Number(
                body_temperature_threshold_high
              ),
              body_temperature_threshold_low: Number(
                body_temperature_threshold_low
              ),
              oxygen_saturation_threshold_high: Number(
                oxygen_saturation_threshold_high
              ),
              oxygen_saturation_threshold_low: Number(
                oxygen_saturation_threshold_low
              ),
              respiratory_rate_threshold_high: Number(
                respiratory_rate_threshold_high
              ),
              respiratory_rate_threshold_low: Number(
                respiratory_rate_threshold_low
              ),
            });
            toast.success(`Added patient: ${name}`);
          } catch (error) {
            toast.error(`Error adding patient: ${name}`);
            console.error(`Error adding patient ${name}:`, error);
            uploadErrors = true;
          }
        }

        if (!uploadErrors) {
          toast.success("Bulk upload completed successfully");
        } else {
          toast.error("Bulk upload completed with errors");
        }

        setLoading(false);
        setCsvFile(null); // Reset the form after upload
      },
      error: (error) => {
        toast.error("Failed to parse CSV file");
        console.error("CSV parsing error:", error);
        setLoading(false);
      },
    });
  };

  return (
    <div className="bg-white my-4 rounded-sm ring-1 ring-gray-300 p-4">
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
        accept=".csv"
      />

      {csvFile && (
        <p className="text-sm text-gray-600 mt-2">
          File selected: <span className="font-semibold">{csvFile.name}</span>
        </p>
      )}

      <div className="flex flex-col p-3 md:text-sm text-xs">
        <p className="text-gray-500">
          Please upload a CSV file with the following columns:{" "}
          <span className="text-slate-600">{/* TODO: to be filled */}</span>
        </p>
        <div className="md:text-sm text-xs text-red-600 font-semibold">
          Note:{" "}
          <p>1. The columns should be in the same order as mentioned above</p>
          <p>
            2. The doctorAssigned name should be case-sensitive and match the
            database
          </p>
        </div>
      </div>

      <button
        onClick={handleBulkUpload}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow mt-4 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
    </div>
  );
};

export default AddPatientsBulk;
