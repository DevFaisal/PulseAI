import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import Select from "react-select";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Inputs/FormInput";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const firebase = useFirebase();

  useEffect(() => {
    const fetchPatientsAndDoctors = async () => {
      try {
        const patientsData = await firebase.getPatients();
        const doctorsData = await firebase.getDoctors();

        // Format doctor data for react-select
        const formattedDoctors = doctorsData.map((doctor) => ({
          value: doctor.name,
          label: `${doctor.name} — ${doctor.specialty.toUpperCase()}`,
          specialty: doctor.specialty,
        }));
        setPatients(patientsData);
        setDoctorOptions(formattedDoctors);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchPatientsAndDoctors();
  }, [firebase]);

  const handleSelectChange = (selectedOption) => {
    setValue("doctorAssigned", selectedOption ? selectedOption.value : "");
  };

  const onSubmit = async (data) => {
    try {
      const result = await firebase.createNewPatient(
        data.name,
        data.age,
        data.doctorAssigned,
        data.symptoms,
        data.diagnosis
      );
      console.log("Patient added successfully", result);
      setPatients((prevPatients) => [...prevPatients, data]);
      reset();
    } catch (error) {
      console.error("Failed to add patient", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Manage Patients
      </h1>
      <div className="bg-white rounded-lg p-2 md:p-6 mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Add New Patient
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <FormInput
            label="Name"
            type="text"
            name="name"
            register={register}
            placeholder="Enter patient's name"
            error={errors.name}
          />
          <FormInput
            label="Age"
            type="number"
            name="age"
            register={register}
            placeholder="Enter patient's age"
            error={errors.age}
          />
          <div className="flex flex-col p-3 rounded-md">
            <label
              htmlFor="doctorAssigned"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor Assigned
            </label>
            <Select
              options={doctorOptions}
              onChange={handleSelectChange}
              placeholder="Select a doctor"
              className="mt-1 block w-full"
            />
          </div>
          <FormInput
            label="Symptoms"
            type="text"
            name="symptoms"
            register={register}
            placeholder="Enter symptoms"
            error={errors.symptoms}
          />
          <FormInput
            label="Diagnosis"
            type="text"
            name="diagnosis"
            register={register}
            placeholder="Enter diagnosis"
            error={errors.diagnosis}
          />
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

      <div className="bg-white shadow-md ring-1 ring-gray-300 rounded-lg p-4 overflow-scroll">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Patients List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 overflow-scroll">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor Assigned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symptoms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosis
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.doctorAssigned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.hospitalId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.symptoms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.diagnosis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
