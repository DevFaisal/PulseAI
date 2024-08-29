import React from "react";

const Medication = ({ patient }) => {
  return (
    <div className="bg-white p-6 rounded-lg ring-1 ring-gray-400 overflow-scroll">
      <h1 className="text-xl font-bold mb-4">Medications</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border-b-2">Name</th>
            <th className="p-2 border-b-2">Dosage</th>
            <th className="p-2 border-b-2">Route</th>
            <th className="p-2 border-b-2">Prescribed for</th>
            <th className="p-2 border-b-2">Note</th>
            <th className="p-2 border-b-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patient?.medications.map((med) => (
            <tr key={med.id} className="hover:bg-gray-100">
              <td className="p-2 border-b">{med.medication_name}</td>
              <td className="p-2 border-b">{med.dosage}</td>
              <td className="p-2 border-b">{med.route}</td>
              <td className="p-2 border-b">{med.prescribed_for_days} Days</td>
              <td className="p-2 border-b">{med.note}</td>
              <td
                className={`p-2 border-b ${
                  med.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {med.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medication;
