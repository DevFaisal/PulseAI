import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Inputs/FormInput";
import toast from "react-hot-toast";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      specialty: "",
      contact: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await firebase.getDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    fetchDoctors();
  }, [firebase]);

  const onSubmit = async (data) => {
    try {
      const result = await firebase.createNewDoctor(
        "Dr. " + data.name,
        data.specialty,
        data.contact,
        data.email.toLowerCase(),
        data.password
      );
      toast.success("Doctor added successfully");
      setDoctors((prevDoctors) => [...prevDoctors, data]);
      reset();
    } catch (error) {
      console.error("Failed to add doctor", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Manage Doctors
      </h1>
      <div className="bg-white rounded-lg p-2 md:p-6 mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Add New Doctor
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Name"
            type="text"
            name="name"
            placeholder="Enter doctor's name"
            register={register}
            error={errors.name}
          />
          <FormInput
            label="Specialty"
            type="text"
            name="specialty"
            placeholder="Enter doctor's specialty"
            register={register}
            error={errors.specialty}
          />
          <FormInput
            label="Contact Number"
            type="text"
            name="contact"
            placeholder="Enter doctor's contact number"
            register={register}
            error={errors.contact}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter doctor's email"
            register={register}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Set doctor's password"
            register={register}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Add Doctor
          </button>
        </form>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Doctors List
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {doctor.name}
              </h3>
              <p className="text-gray-700">
                <strong>Specialty:</strong> {doctor.specialty}
              </p>
              <p className="text-gray-700">
                <strong>Hospital ID:</strong> {doctor.hospitalId}
              </p>
              <p className="text-gray-700">
                <strong>Contact:</strong> {doctor.contact}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {doctor.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;
