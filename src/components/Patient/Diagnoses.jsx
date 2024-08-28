import React from "react";

const Diagnoses = ({ patient }) => {
  return (
    <div className="bg-white w-1/4 p-4 rounded-md ring-1 ring-gray-400">
      <h1 className="text-xl font-semibold">Diagnoses</h1>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="p-2 rounded-md bg-sky-500 text-white">
          {patient.programs?.map((p) => p.program_name)}
        </span>
      </div>
    </div>
  );
};

export default Diagnoses;
