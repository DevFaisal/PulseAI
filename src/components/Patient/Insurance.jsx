import React from "react";

const Insurance = ({ patient }) => {
  return (
    <div className="bg-white p-4 rounded-lg ring-1 ring-gray-400">
      <h1 className="text-xl font-semibold">Insurance Information</h1>
      <div className="flex flex-wrap gap-2 mt-2">
        <h2>
          <span className="font-semibold">Insurance:</span>{" "}
          {patient.insurance_info.insurance_name}
        </h2>
        <h1>
          <span className="font-semibold">Holder name:</span>{" "}
          {patient.insurance_info.holder_name}
        </h1>
        <h1>
          <span className="font-semibold">ID number:</span>{" "}
          {patient.insurance_info.insurance_id}
        </h1>
        <h1>
          <span className="font-semibold">Relation:</span>{" "}
          {patient.insurance_info.relationship_to_insured}
        </h1>
      </div>
    </div>
  );
};

export default Insurance;
