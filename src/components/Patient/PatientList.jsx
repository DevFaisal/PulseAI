import React from "react";
import { useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { toast } from "react-hot-toast";

const PatientList = ({ patients, setPatients }) => {
  const firebase = useFirebase();

  const handleDeletePatient = async (id) => {
    try {
      const result = await firebase.deletePatient(id);
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id)
      );
      toast.success("Patient deleted successfully");
    } catch (error) {
      console.error("Failed to delete patient", error);
      toast.error("Failed to delete patient");
    }
  };
  return (
    <div className="bg-white flex-1 rounded-sm ring-1 ring-gray-300 p-4 overflow-scroll">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Patients List
      </h2>
      <div className="overflow-x-auto w-80 md:w-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-scroll">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Assigned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symptoms
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients?.map((patient, index) => (
              <tr
                key={index}
                className={`${patient.diagnosed && "bg-green-200"}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {patient.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.doctorAssigned}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.hospitalId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.symptoms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.diagnosis?.value || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
