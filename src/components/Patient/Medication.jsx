import React from "react";

const Medication = ({ patient }) => {
  if (!patient.medicines) {
    return <h1>No Medications</h1>;
  }
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-400 overflow-x-clip">
      <h1 className="text-lg sm:text-xl font-bold mb-4">Medications</h1>
      <table className="w-full table-auto border-collapse border border-gray-400">
        <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
          <tr className="text-left">
            <th className="p-2 border">Medicine</th>
            <th className="p-2 border">Dosage</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {patient.medicines.map((medicine, index) => (
            <tr key={index}>
              <td className="p-2 border">{medicine.name}</td>
              <td className="p-2 border">{medicine.dosage}</td>
              <td className="p-2 border">Active</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medication;
