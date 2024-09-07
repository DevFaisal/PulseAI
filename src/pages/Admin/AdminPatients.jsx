import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import Select from "react-select";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Inputs/FormInput";
import toast from "react-hot-toast";
import AddPatientsBulk from "../../components/AddPatientsBulk";
import z from "zod";

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

  const handleGenderChange = (selectedOption) => {
    setValue("gender", selectedOption ? selectedOption.value : "");
  };

  const handleDeletePatient = async (id) => {
    try {
      const result = await firebase.deletePatient(id);
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id)
      );
      toast.success("Patient deleted successfully");
    } catch (error) {
      console.error("Failed to delete patient", error);
      toast.error("Failed to delete patient");
    }
  };

  const patientSchema = z.object({
    name: z.string().nonempty(),
    age: z.string(),
    gender: z.string().nonempty(),
    email: z.string().email(),
    phone: z.string().min(10),
    address: z.string().nonempty(),
    insurance_name: z.string().nonempty(),
    insurance_id: z.string().nonempty(),
    relationship_to_insured: z.string().nonempty(),
    doctorAssigned: z.string().nonempty(),
    symptoms: z.string().nonempty(),
  });

  const onSubmit = async (data) => {
    const result = patientSchema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        if (error.path) {
          toast.error(`Error in field: ${error.path.join(".")}`);
        } else {
          toast.error(error.message);
        }
      });
      return;
    }
    try {
      const result = await firebase.createNewPatient(data);
      if (result) {
        toast.success("Patient added successfully");
      }
      setPatients((prevPatients) => [...prevPatients, data]);
      reset();
    } catch (error) {
      toast.error("Failed to add patient");
      console.error("Failed to add patient", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Manage Patients
      </h1>
      <div className="bg-white rounded-lg mb-8 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Add New Patient
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FormInput
              label="Name"
              type="text"
              name="name"
              register={register}
              placeholder="Enter Patient's name"
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
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-left pt-2.5 font-semibold text-md text-gray-700"
              >
                Gender
              </label>
              <Select
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                onChange={handleGenderChange}
                className="mt-1 block w-full"
              />
            </div>
            <FormInput
              label="Email"
              type="email"
              name="email"
              register={register}
              placeholder="Enter patient's email"
              error={errors.email}
            />
            <FormInput
              label="Phone"
              type="tel"
              name="phone"
              register={register}
              placeholder="Enter patient's phone number"
              error={errors.phone}
            />
            <FormInput
              label="Address"
              type="text"
              name="address"
              register={register}
              placeholder="Enter patient's address"
              error={errors.address}
            />
          </div>

          <div className="flex flex-col p-2 rounded-md bg-slate-100">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center">
              Insurance Info
            </h1>
            <FormInput
              label="Insurance Name"
              type="text"
              name="insurance_name"
              register={register}
              placeholder="Enter insurance name"
              error={errors.insurance_name}
            />
            <FormInput
              label="Insurance ID"
              type="text"
              name="insurance_id"
              register={register}
              placeholder="Enter insurance ID"
              error={errors.insurance_id}
            />
            <FormInput
              label="Relationship to Insured"
              type="text"
              name="relationship_to_insured"
              register={register}
              placeholder="Enter relationship to insured"
              error={errors.relationship_to_insured}
            />
          </div>

          <div className="flex flex-col p-2 rounded-md">
            <label
              htmlFor="doctorAssigned"
              className="text-left pt-2.5 font-semibold text-md text-gray-700"
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
      <AddPatientsBulk />
      <div className="bg-white shadow-md ring-1 ring-gray-300 rounded-lg p-4 overflow-scroll">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Patients List
        </h2>
        <div className="overflow-x-auto w-80 md:w-auto">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      <span>Delete</span>
                    </button>
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
