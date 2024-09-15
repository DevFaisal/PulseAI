import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
import { Circle, CircleAlert } from "lucide-react";

const Patients = () => {
  const { getPatients, updatePatient } = useFirebase();
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        const sortedPatients = patientsData.sort((a, b) => {
          return a.alertEnabled === b.alertEnabled
            ? 0
            : a.alertEnabled
            ? -1
            : 1;
        });
        setPatients(sortedPatients);
        await handleAlert(sortedPatients);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };
    fetchPatients();
  }, [getPatients]);

  const handleAlert = async (patients) => {
    const newAlerts = [];
    for (const patient of patients) {
      const patientAlerts = [];

      const glucoseLevel = parseInt(patient.vitals.blood_glucose.level);
      const glucoseHigh = parseInt(patient.thresholds.blood_glucose.high);
      const glucoseLow = parseInt(patient.thresholds.blood_glucose.low);

      const systolicBP = parseInt(patient.vitals.blood_pressure.systolic);
      const diastolicBP = parseInt(patient.vitals.blood_pressure.diastolic);
      const systolicHigh = parseInt(
        patient.thresholds.blood_pressure.high.split("/")[0],
        10
      );
      const systolicLow = parseInt(
        patient.thresholds.blood_pressure.low.split("/")[0],
        10
      );
      const diastolicHigh = parseInt(
        patient.thresholds.blood_pressure.high.split("/")[1],
        10
      );
      const diastolicLow = parseInt(
        patient.thresholds.blood_pressure.low.split("/")[1],
        10
      );

      const heartRate = parseInt(patient.vitals.heart_rate.bpm);
      const heartHigh = parseInt(patient.thresholds.heart_rate.high);
      const heartLow = parseInt(patient.thresholds.heart_rate.low);

      const oxygenLevel = parseInt(patient.vitals.oxygen_saturation.spO2);
      const oxygenHigh = parseInt(patient.thresholds.oxygen_saturation.high);
      const oxygenLow = parseInt(patient.thresholds.oxygen_saturation.low);

      const bodyTemp = parseInt(patient.vitals.body_temperature.temperature);
      const bodyTempHigh = parseInt(patient.thresholds.body_temperature.high);
      const bodyTempLow = parseInt(patient.thresholds.body_temperature.low);

      const respiratoryRate = parseInt(patient.vitals.respiratory_rate.rate);
      const respiratoryHigh = parseInt(
        patient.thresholds.respiratory_rate.high
      );
      const respiratoryLow = parseInt(patient.thresholds.respiratory_rate.low);

      if (glucoseLevel > glucoseHigh || glucoseLevel < glucoseLow) {
        patientAlerts.push(
          `Patient ${patient.name} has an alert in blood glucose`
        );
      }
      if (
        systolicBP > systolicHigh ||
        systolicBP < systolicLow ||
        diastolicBP > diastolicHigh ||
        diastolicBP < diastolicLow
      ) {
        patientAlerts.push(
          `Patient ${patient.name} has an alert in blood pressure`
        );
      }
      if (heartRate > heartHigh || heartRate < heartLow) {
        patientAlerts.push(
          `Patient ${patient.name} has an alert in heart rate`
        );
      }
      if (oxygenLevel > oxygenHigh || oxygenLevel < oxygenLow) {
        patientAlerts.push(
          `Patient ${patient.name} has an alert in oxygen saturation`
        );
      }
      if (bodyTemp > bodyTempHigh || bodyTemp < bodyTempLow) {
        patientAlerts.push(
          `Patient ${patient.name} has an alert in body temperature`
        );
      }
      if (
        respiratoryRate > respiratoryHigh ||
        respiratoryRate < respiratoryLow
      ) {
        patientAlerts.push(
          `Patient ${patient.name} has an alert in respiratory rate`
        );
      }

      if (patientAlerts.length > 0) {
        newAlerts.push(...patientAlerts);
        await updatePatient(patient.id, {
          alertEnabled: true,
          alerts: patientAlerts,
        });
      } else {
        await updatePatient(patient.id, {
          alertEnabled: false,
          alerts: [],
        });
      }
    }

    setAlerts(newAlerts);
  };

  return (
    <div className="bg-white max-w-full h-80 overflow-x-auto overflow-y-scroll p-2 ring-1 ring-gray-400 rounded-lg">
      <table className="min-w-full text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 whitespace-nowrap">#</th>
            <th className="p-2 whitespace-nowrap">Name</th>
            <th className="p-2 whitespace-nowrap">Age</th>
            <th className="p-2 whitespace-nowrap">Gender</th>
            <th className="p-2 whitespace-nowrap">Doctor Assigned</th>
            <th className="p-2 whitespace-nowrap">Symptoms</th>
            <th className="p-2 whitespace-nowrap">Diagnosis</th>
            <th className="p-2 whitespace-nowrap">Alerts</th>
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
                <td className="p-2">{String(patient.gender) || "N/A"}</td>
                <td className="p-2">{patient.doctorAssigned}</td>
                <td className="p-2">{patient.symptoms}</td>
                <td className="p-2">{patient.diagnosis?.value || "Pending"}</td>
                <td className="p-2">
                  {patient.alertEnabled ? (
                    <div>
                      <CircleAlert color="red" strokeWidth={3} />
                    </div>
                  ) : (
                    <Circle color="green" strokeWidth={4} />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
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
