import React from "react";

const Medication = ({ patient }) => {
  if (!patient || !patient.medicines || patient.medicines.length === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-400">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          No Medications Found
        </h1>
        <p className="text-gray-600 mt-2">
          It looks like there are no medications listed for this patient.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-400">
      <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Medications
      </h1>
      <table className="w-full table-auto border-collapse border border-gray-400">
        <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
          <tr className="text-left">
            <th className="p-2 border" scope="col">
              Medicine
            </th>
            <th className="p-2 border" scope="col">
              Dosage
            </th>
            <th className="p-2 border" scope="col">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {patient.medicines.map((medicine, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border">{medicine.name}</td>
              <td className="p-2 border">{medicine.dosage}</td>
              <td className="p-2 border">{medicine.status || "Active"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medication;
