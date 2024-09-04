import React from "react";

const PatientInfo = ({ patient }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:px-10 sm:py-6 gap-4 sm:gap-6 bg-white rounded-md ring-1 ring-gray-400">
      <img
        className="rounded-full w-32 h-32 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-cover"
        src="https://tech.shutterstock.com/assets/img/posts/2019/0312-02.jpg"
        alt="Patient"
      />
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-center sm:text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            {patient.name}
          </h1>
          <p className="text-gray-500">
            <span>{patient.id}</span> |{" "}
            {/* <span>{patient.gender || ""}</span> |{" "} */}
            <span>
              {/* {new Date().getFullYear() - new Date(patient.dob).getFullYear()}{" "}
              Years */}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 sm:mt-0 text-center sm:text-left">
        {/* <h1 className="text-md sm:text-lg md:text-xl font-semibold">
          Condition
        </h1> */}
        {/* <ul className="text-gray-500 list-disc pl-5">
          {/* {patient.conditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))} */}
        {/* </ul>  */}
      </div>
    </div>
  );
};

export default PatientInfo;
