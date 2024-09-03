import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    doctorAssigned: "",
    hospitalId: "",
    symptoms: "",
    diagnosis: "",
  });

  const firebase = useFirebase();
  console.log(firebase.user);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await firebase.getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };

    fetchPatients();
  }, [firebase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.createNewPatient(
        form.name,
        form.age,
        form.doctorAssigned,
        form.hospitalId,
        form.symptoms,
        form.diagnosis
      );
      console.log("Patient added successfully", result);
      setPatients((prevPatients) => [...prevPatients, form]);
      setForm({
        name: "",
        age: "",
        doctorAssigned: "",
        hospitalId: "",
        symptoms: "",
        diagnosis: "",
      });
    } catch (error) {
      console.error("Failed to add patient", error);
    }
  };

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 ">
        Manage Patients
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 ring-1 ring-gray-300">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New Patient
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="doctorAssigned"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor Assigned
            </label>
            <input
              type="text"
              name="doctorAssigned"
              value={form.doctorAssigned}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="hospitalId"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital ID
            </label>
            <input
              type="text"
              name="hospitalId"
              value={form.hospitalId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="symptoms"
              className="block text-sm font-medium text-gray-700"
            >
              Symptoms
            </label>
            <input
              type="text"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="diagnosis"
              className="block text-sm font-medium text-gray-700"
            >
              Diagnosis
            </label>
            <input
              type="text"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-md ring-1 ring-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Patients List
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients?.map((patient, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {patient.name}
              </h3>
              <p className="text-gray-600">
                <strong>Age:</strong> {patient.age}
              </p>
              <p className="text-gray-600">
                <strong>Doctor Assigned:</strong> {patient.doctorAssigned}
              </p>
              <p className="text-gray-600">
                <strong>Hospital ID:</strong> {patient.hospitalId}
              </p>
              <p className="text-gray-600">
                <strong>Symptoms:</strong> {patient.symptoms}
              </p>
              <p className="text-gray-600">
                <strong>Diagnosis:</strong> {patient.diagnosis}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
