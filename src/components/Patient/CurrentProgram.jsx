import React from "react";

const CurrentProgram = ({ patient }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg ring-1 ring-gray-400">
      <h1 className="text-lg sm:text-xl font-bold mb-4">
        Note from the Doctor
      </h1>
      <p
      className="italic text-gray-600"
      >
        {patient?.clinicalNotes ||
          "No note from the doctor. Please contact the doctor for more information."}
      </p>
    </div>
  );
};

export default CurrentProgram;
