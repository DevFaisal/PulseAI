import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Inputs/FormInput";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import z from "zod";

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

  const doctorSchema = z.object({
    name: z.string().nonempty("Name is required"),
    specialty: z.string().nonempty("Specialty is required"),
    contact: z.string().nonempty("Contact is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
  });

  const onSubmit = async (data) => {
    try {
      const { result, error } = doctorSchema.safeParse(data);
      if (error) {
        toast.error(error.errors[0].message);
        return;
      }
      const res = await firebase.createNewDoctor(
        "Dr. " + data.name,
        data.specialty,
        data.contact,
        data.email.toLowerCase(),
        data.password
      );
      console.log(res);
      toast.success("Doctor added successfully");
      setDoctors((prevDoctors) => [...prevDoctors, data]);
      reset();
    } catch (error) {
      toast.error(error.code);
      console.error("Failed to add doctor", error);
    }
  };

  const handleDoctorDelete = async (doctorId) => {
    try {
      await firebase.deleteDoctor(doctorId);
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== doctorId)
      );
      toast.success("Doctor deleted successfully");
    } catch (error) {
      toast.error("Failed to delete doctor", error);
      console.error("Failed to delete doctor");
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Manage Doctors
      </h1>

      <div className="mb-5">
        <h2 className="text-xl md:text-left text-center md:text-2xl font-semibold text-gray-800 mb-3">
          Add New Doctor
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
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
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Add Doctor
          </button>
        </form>
      </div>

      <div className="bg-white rounded-sm ring-1 ring-gray-300 p-4 md:p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Doctors List
        </h2>
        <div className="overflow-x-auto w-80 md:w-full">
          <table className="min-w-fit md:min-w-full ">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Specialty</th>
                <th className="border px-4 py-2 text-left">Contact</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{doctor.name}</td>
                  <td className="border px-4 py-2">{doctor.specialty}</td>
                  <td className="border px-4 py-2">{doctor.contact}</td>
                  <td className="border px-4 py-2">{doctor.email}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <button onClick={() => handleDoctorDelete(doctor.id)}>
                      <Trash
                        className="cursor-pointer text-red-300 hover:text-red-500"
                        size={23}
                      />
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

export default ManageDoctors;
