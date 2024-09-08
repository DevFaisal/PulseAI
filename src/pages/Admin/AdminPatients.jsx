import React, { useState } from "react";
import toast from "react-hot-toast";
import AddPatientsBulk from "../../components/Patient/AddPatientsBulk";
import { useFirebase } from "../../context/Firebase";
import PatientList from "../../components/Patient/PatientList";
import AddPatient from "../../components/Patient/AddPatient";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);

  return (
    <div>
      <div className="overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-md font-extrabold bg-red-600 my-8 text-white p-2 text-center">
          Add Patients is under construction and will be available soon
        </div>
      </div>

      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Manage Patients
      </h1>
      <AddPatient setPatients={setPatients} />
      <AddPatientsBulk />
      <PatientList patients={patients} setPatients={setPatients} />
    </div>
  );
};

export default AdminPatients;
