import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

const AdminDashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalHospitals, setTotalHospitals] = useState(0);

  const firebase = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await firebase.getPatients();
        const doctorsData = await firebase.getDoctors();
        const hospitalsData = await firebase.getHospitals();

        setTotalPatients(patientsData.length);
        setTotalDoctors(doctorsData.length);
        setTotalHospitals(hospitalsData.length);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [firebase]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white shadow-md rounded-lg p-6 ring-1 ring-gray-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Total Patients
          </h2>
          <p className="text-4xl font-bold text-blue-500">{totalPatients}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 ring-1 ring-gray-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Total Doctors
          </h2>
          <p className="text-4xl font-bold text-blue-500">{totalDoctors}</p>
        </div>
      </div>
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 ring-1 ring-gray-300">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          System Overview
        </h2>
        <p className="text-gray-600">
          Welcome to the Admin Dashboard. Here you can manage all the critical
          aspects of the healthcare system, including patient records, doctor
          assignments, and hospital data.
        </p>
      </div>
      <div className="mt-8">
        <NavLink
          to="/admin/manage-patients"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow"
        >
          Manage Patients
        </NavLink>
      </div>
    </div>
  );
};

export default AdminDashboard;
