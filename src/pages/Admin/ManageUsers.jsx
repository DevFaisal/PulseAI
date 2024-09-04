import React, { useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, form]);
    setForm({
      name: "",
      email: "",
      role: "",
      status: "",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Manage Users
      </h1>

      {/* Add User Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New User
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

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Receptionist">Receptionist</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Users List
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {user.name}
              </h3>
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {user.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
