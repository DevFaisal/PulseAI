import React from "react";

const CurrentProgram = ({ patient }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-400">
      <h1 className="text-lg sm:text-xl font-bold mb-4">Current RPM Program</h1>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Program Name
            </th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Start Date
            </th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Duration
            </th>
            <th className="p-1 sm:p-2 border-b-2 text-sm sm:text-base">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {patient.programs?.map((p, index) => (
            <tr key={index} className="hover:bg-gray-100 rounded-lg">
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {p.program_name}
              </td>
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {p.start_date}
              </td>
              <td className="p-1 sm:p-2 border-b text-sm sm:text-base">
                {p.duration_in_months}
              </td>
              <td
                className={`p-1 sm:p-2 border-b text-sm sm:text-base ${
                  p.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {p.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentProgram;
