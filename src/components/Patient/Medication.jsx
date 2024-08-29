import React from "react";

const Medication = ({ patient }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-400 overflow-x-clip">
      <h1 className="text-lg sm:text-xl font-bold mb-4">Medications</h1>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">Name</th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Dosage
            </th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Route
            </th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base whitespace-nowrap">
              Prescribed for
            </th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">Note</th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {patient?.medications.map((med) => (
            <tr key={med.id} className="hover:bg-gray-100">
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {med.medication_name}
              </td>
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {med.dosage}
              </td>
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {med.route}
              </td>
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base whitespace-nowrap">
                {med.prescribed_for_days} Days
              </td>
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {med.note}
              </td>
              <td
                className={`p-1 sm:p-2 border-b text-sm sm:text-base ${
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
