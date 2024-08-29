import React from "react";

const PatientInfo = ({ patient }) => {
  return (
    <div className="flex items-center justify-between px-10 p-4 gap-6 bg-white w-2/3 rounded-md ring-1 ring-gray-400">
      <div className="flex items-center gap-4">
        <img
          className="rounded-full w-24 h-24 bg-cover"
          src="https://tech.shutterstock.com/assets/img/posts/2019/0312-02.jpg"
          alt="Patient"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <p className="text-gray-500">
            <span>{patient.patient_id}</span> | <span>{patient.gender}</span> |{" "}
            <span>
              {new Date().getFullYear() - new Date(patient.dob).getFullYear()}{" "}
              Years
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Condition</h1>
        <ul className="text-gray-500 list-disc pl-5">
          {patient.conditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientInfo;
