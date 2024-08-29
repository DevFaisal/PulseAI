import React from "react";
import { NavLink } from "react-router-dom";
import demoData from "../../data/demo.json";

const Patients = () => {
  const patients = demoData?.map((data) => ({
    id: data.patient_id,
    name: data.name,
    dob: data.dob,
    gender: data.gender,
    img: "https://tech.shutterstock.com/assets/img/posts/2019/0312-02.jpg",
    conditions: data.conditions.join(", "),
    offTime: new Date(data.off_time).toLocaleString().split(",")[0],
    LFC: new Date(data.last_fellow_call).toLocaleString().split(",")[0],
    LTC: new Date(data.last_time_call_to_patient)
      .toLocaleString()
      .split(",")[0],
  }));

  return (
    <div className="bg-white max-w-full h-80 overflow-x-auto overflow-y-scroll p-2 ring-1 ring-gray-400 rounded-lg">
      <table className="min-w-full text-sm sm:text-base">
        <thead>
          <tr className="grid grid-cols-4 sm:grid-cols-8 min-w-max bg-gray-200 text-left p-2">
            <th className="whitespace-nowrap">Patient ID</th>
            <th className="whitespace-nowrap">Patient Name</th>
            <th className="whitespace-nowrap hidden sm:table-cell">Gender</th>
            <th className="whitespace-nowrap hidden sm:table-cell">DOB</th>
            <th className="whitespace-nowrap hidden sm:table-cell">
              Conditions
            </th>
            <th className="whitespace-nowrap hidden sm:table-cell">Off Time</th>
            <th className="whitespace-nowrap hidden sm:table-cell">
              Last Fellow Call
            </th>
            <th className="whitespace-nowrap hidden sm:table-cell">
              Last Time Call
            </th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <NavLink to={`patient/${patient.id}`} key={patient.id}>
              <tr className="grid grid-cols-4 sm:grid-cols-8 min-w-max items-center p-2 border-b hover:bg-gray-100">
                <td className="whitespace-nowrap">#{String(patient.id)}</td>
                <td className="flex items-center gap-2 whitespace-nowrap">
                  <img
                    className="rounded-full"
                    src={patient.img}
                    alt={patient.name}
                    width={30}
                    height={30}
                  />
                  <span>{patient.name}</span>
                </td>
                <td className="whitespace-nowrap hidden sm:table-cell">
                  {patient.gender}
                </td>
                <td className="whitespace-nowrap hidden sm:table-cell">
                  {patient.dob}
                </td>
                <td className="whitespace-nowrap hidden sm:table-cell">
                  {patient.conditions.length > 20
                    ? patient.conditions.slice(0, 20) + "..."
                    : patient.conditions}
                </td>
                <td className="whitespace-nowrap hidden sm:table-cell">
                  {patient.offTime}
                </td>
                <td className="whitespace-nowrap hidden sm:table-cell">
                  {patient.LFC}
                </td>
                <td className="whitespace-nowrap hidden sm:table-cell">
                  {patient.LTC}
                </td>
              </tr>
            </NavLink>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
