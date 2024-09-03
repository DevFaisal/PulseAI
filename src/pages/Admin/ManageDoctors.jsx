import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    hospitalId: "",
    contact: "",
    email: "",
  });

  const firebase = useFirebase();

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
      const result = await firebase.createNewDoctor(
        form.name,
        form.specialty,
        form.contact,
        form.email
      );
      console.log("Doctor added successfully", result);
      setDoctors((prevDoctors) => [...prevDoctors, form]);
      setForm({
        name: "",
        specialty: "",
        contact: "",
        email: "",
      });
    } catch (error) {
      console.error("Failed to add doctor", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Manage Doctors
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New Doctor
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
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700"
            >
              Specialty
            </label>
            <input
              type="text"
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
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
              Add Doctor
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Doctors List
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors?.map((doctor, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {doctor.name}
              </h3>
              <p className="text-gray-600">
                <strong>Specialty:</strong> {doctor.specialty}
              </p>
              <p className="text-gray-600">
                <strong>Hospital ID:</strong> {doctor.hospitalId}
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong> {doctor.contact}
              </p>
              <p className="text-gray-600">
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
