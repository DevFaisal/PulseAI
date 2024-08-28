import React from "react";

const CurrentProgram = ({ patient }) => {
  return (
    <div className="bg-white w-1/2 p-6 rounded-lg ring-1 ring-gray-400">
      <h1 className="text-xl font-bold mb-4">Current RPM Program</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border-b-2">Program Name</th>
            <th className="p-2 border-b-2">Start Date</th>
            <th className="p-2 border-b-2">Duration</th>
            <th className="p-2 border-b-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {patient.programs?.map((p) => (
            <tr className="hover:bg-gray-100 rounded-lg">
              <td className="p-2 border-b">{p.program_name}</td>
              <td className="p-2 border-b">{p.start_date}</td>
              <td className="p-2 border-b">{p.duration_in_months}</td>
              <td className="p-2 border-b text-green-600">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentProgram;
