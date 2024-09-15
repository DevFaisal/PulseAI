import React, { useState } from "react";
import toast from "react-hot-toast";
import AddPatientsBulk from "../../components/Patient/AddPatientsBulk";
import { useFirebase } from "../../context/FirebaseContext";
import PatientList from "../../components/Patient/PatientList";
import AddPatient from "../../components/Patient/AddPatient";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);

  return (
    <div>
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
