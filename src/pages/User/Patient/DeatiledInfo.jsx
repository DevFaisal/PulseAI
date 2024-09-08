import React, { useState, useEffect } from "react";

const DeatiledInfo = ({ patient }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate component mounting (fetching or receiving data)
  useEffect(() => {
    // Simulate a network request delay (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false); // Data is "ready"
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading Patient Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white w-full ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-600">
            Personal Information
          </h3>
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Symptoms:</strong> {patient.symptoms || "None"}
          </p>
          <p>
            <strong>Clinical Notes:</strong> {patient.clinicalNotes}
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-600">
            Contact Information
          </h3>
          <p>
            <strong>Address:</strong> {patient.contact_info?.address || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {patient.contact_info?.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {patient.contact_info?.phone || "N/A"}
          </p>
        </div>

        {/* Diagnosis and Doctor */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-600">
            Medical Information
          </h3>
          <p>
            <strong>Diagnosis:</strong> {patient.diagnosis?.value || "N/A"}
          </p>
          <p>
            <strong>Doctor Assigned:</strong> {patient.doctorAssigned}
          </p>
        </div>

        {/* Insurance Information */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-600">
            Insurance Information
          </h3>
          <p>
            <strong>Insurance Name:</strong>{" "}
            {patient.insurance_info?.insurance_name || "N/A"}
          </p>
          <p>
            <strong>Insurance ID:</strong>{" "}
            {patient.insurance_info?.insurance_id || "N/A"}
          </p>
          <p>
            <strong>Holder Name:</strong>{" "}
            {patient.insurance_info?.holder_name || "N/A"}
          </p>
          <p>
            <strong>Relationship to Insured:</strong>{" "}
            {patient.insurance_info?.relationship_to_insured || "N/A"}
          </p>
        </div>
      </div>

      {/* Medicines */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-600">Medicines</h3>
        <ul className="list-disc ml-5 space-y-1">
          {patient?.medicines?.map((medicine, index) => (
            <li key={index}>
              {medicine.name} - {medicine.dosage}
            </li>
          ))}
        </ul>
      </div>

      {/* Vitals */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-600">Vitals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p>
              <strong>Blood Glucose:</strong>{" "}
              {patient.vitals.blood_glucose?.level}{" "}
              {patient.vitals.blood_glucose?.unit}
            </p>
            <p>Status: {patient.vitals.blood_glucose?.status}</p>
          </div>
          <div>
            <p>
              <strong>Blood Pressure:</strong>{" "}
              {patient.vitals.blood_pressure?.systolic}/
              {patient.vitals.blood_pressure?.diastolic}{" "}
              {patient.vitals.blood_pressure?.unit}
            </p>
            <p>Status: {patient.vitals.blood_pressure?.status}</p>
          </div>
          <div>
            <p>
              <strong>Body Temperature:</strong>{" "}
              {patient.vitals.body_temperature?.temperature}{" "}
              {patient.vitals.body_temperature?.unit}
            </p>
            <p>Status: {patient.vitals.body_temperature?.status}</p>
          </div>
          <div>
            <p>
              <strong>Heart Rate:</strong> {patient.vitals.heart_rate?.bpm} bpm
            </p>
            <p>Status: {patient.vitals.heart_rate?.status}</p>
          </div>
          <div>
            <p>
              <strong>Oxygen Saturation:</strong>{" "}
              {patient.vitals.oxygen_saturation?.spO2}{" "}
              {patient.vitals.oxygen_saturation?.unit}
            </p>
            <p>Status: {patient.vitals.oxygen_saturation?.status}</p>
          </div>
          <div>
            <p>
              <strong>Respiratory Rate:</strong>{" "}
              {patient.vitals.respiratory_rate?.rate}{" "}
              {patient.vitals.respiratory_rate?.unit}
            </p>
            <p>Status: {patient.vitals.respiratory_rate?.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeatiledInfo;
