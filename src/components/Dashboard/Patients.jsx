import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

const Patients = () => {
  const { getPatients } = useFirebase();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        console.log("Patients data", patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };
    fetchPatients();
  }, [getPatients]);

  return (
    <div className="bg-white max-w-full h-80 overflow-x-auto overflow-y-scroll p-2 ring-1 ring-gray-400 rounded-lg">
      <table className="min-w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 whitespace-nowrap">#</th>
            <th className="p-2 whitespace-nowrap">Name</th>
            <th className="p-2 whitespace-nowrap">Age</th>
            <th className="p-2 whitespace-nowrap">Doctor Assigned</th>
            <th className="p-2 whitespace-nowrap">Symptoms</th>
            <th className="p-2 whitespace-nowrap">Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <tr key={patient.id} className="hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <NavLink
                    to={`patient/${patient.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {patient.name}
                  </NavLink>
                </td>
                <td className="p-2">{patient.age}</td>
                <td className="p-2">{patient.doctorAssigned}</td>
                <td className="p-2">{patient.symptoms}</td>
                <td className="p-2">{patient.diagnosis}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
