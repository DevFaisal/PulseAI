import React, { useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import Card from "../../../components/Card";
import { useParams } from "react-router-dom";
import patients from "../../../lib/patients.json";
import PatientInfo from "../../../components/Patient/PatientInfo";
import Diagnoses from "../../../components/Patient/Diagnoses";
import Medication from "../../../components/Patient/Medication";
import CurrentProgram from "../../../components/Patient/CurrentProgram";
import Insurance from "../../../components/Patient/Insurance";
import { useFirebase } from "../../../context/Firebase";

const PatientPage = () => {
  const { id } = useParams();
  const firebase = useFirebase();

  const [patient, setPatient] = React.useState({});

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await firebase.getSinglePatient(id);
      setPatient(res);
    };
    fetchPatient();
  }, [id, firebase]);

  return (
    <Wrapper>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-3 md:grid-cols-2 gap-4">
            {/*First Card*/}
            <PatientInfo patient={patient} />
            {/*Second Card*/}
            <Diagnoses patient={patient} />
            {/*Third Card*/}
            <Insurance patient={patient} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <Card number={"Vitals"} link={"vitals"} color="bg-red-400" />
            <Card number={"Treatment"} color="bg-blue-400" />
            <Card number={"Appointments"} color="bg-pink-400" />
            <Card number={"Medications"} color="bg-yellow-400" />
            <Card number={"Reports"} color="bg-sky-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CurrentProgram patient={patient} />
           <Medication patient={patient} />
        </div>
        <div className="flex gap-2 ring-1 rounded-lg ring-gray-400">
          <div className="bg-white w-full h-80 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Current RPM Program</h1>
            <h1>More to be Added</h1>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PatientPage;
