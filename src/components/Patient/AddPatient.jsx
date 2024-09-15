import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirebase } from "../../context/FirebaseContext";
import FormInput from "../Inputs/FormInput";
import SelectInput from "../Inputs/SelectInput";
import toast from "react-hot-toast";
import { validatePatientSchema } from "../../lib/zod";

import {
  GENERAL_INFORMATION_INPUTS,
  MEDICAL_INFORMATION_INPUTS,
  THRESHOLDS_INPUTS,
} from "../../lib/constants";

const AddPatient = ({ setPatients }) => {
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

        const formattedDoctors = doctorsData.map((doctor) => ({
          value: doctor.name,
          label: `${doctor.name} — ${doctor.specialty.toUpperCase()}`,
        }));

        setPatients(patientsData);
        setDoctorOptions(formattedDoctors);
      } catch (error) {
        toast.error("Failed to fetch doctors and patients");
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

  const onSubmit = async (data) => {
    // const res = await validatePatientSchema(data);
    console.log(data);

    // if (res.error) {
    //   toast.error(res.error.errors[0].message);
    //   return;
    // }

    try {
      await firebase.createNewPatient(data);
      setPatients((prevPatients) => [...prevPatients, data]);
      toast.success("Patient added successfully");
      reset();
    } catch (error) {
      toast.error("Failed to add patient");
    }
  };
  return (
    <div className="bg-white rounded-sm p-6 ring-1 ring-gray-300 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Patient
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* General Information Section */}
        <div className=" p-3 rounded-md mb-6">
          <h3 className="text-xl bg-orange-100 p-2 font-semibold mb-4">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GENERAL_INFORMATION_INPUTS.map((input) => (
              <FormInput
                key={input.name}
                label={input.label}
                type={input.type}
                name={input.name}
                register={register}
                placeholder={input.placeholder}
                error={errors[input.name]}
              />
            ))}

            {/* Gender and Doctor Selection */}
            <SelectInput
              label="Gender"
              placeholder="Select gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              onChange={handleGenderChange}
            />
            <SelectInput
              label="Doctor Assigned"
              placeholder="Assign a doctor"
              options={doctorOptions}
              onChange={handleSelectChange}
            />
          </div>
        </div>

        {/* Medical Information Section */}
        {/* <div className=" p-3 rounded-md mb-6">
          <h3 className="text-xl bg-red-100 p-2 font-semibold mb-4">
            Medical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEDICAL_INFORMATION_INPUTS.map((input) => (
              <FormInput
                key={input.name}
                label={input.label}
                type={input.type}
                name={input.name}
                register={register}
                placeholder={input.placeholder}
                error={errors[input.name]}
              />
            ))}
          </div>
        </div> */}
        <div className=" p-3 rounded-md mb-6">
          <h3 className="text-xl bg-blue-100 p-2 font-semibold mb-4">
            Threshold Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {THRESHOLDS_INPUTS.map((input) => (
              <div>
                <label className="text-gray-800 font-semibold">
                  {input.label}
                </label>
                <div>
                  <FormInput
                    key={input.nameOne}
                    type={input.type}
                    name={input.nameOne}
                    register={register}
                    placeholder={input.subLabelOne}
                    error={errors[input.nameOne]}
                  />
                </div>
                <div>
                  <FormInput
                    key={input.nameTwo}
                    type={input.type}
                    name={input.nameTwo}
                    register={register}
                    placeholder={input.subLabelTwo}
                    error={errors[input.nameTwo]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
