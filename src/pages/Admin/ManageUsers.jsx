import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../components/Inputs/FormInput"; // Assuming you have this component
import { useFirebase } from "../../context/FirebaseContext";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const firebase = useFirebase();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await firebase.getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, [firebase]);

  const onSubmit = async (data) => {
    try {
      const user = await firebase.createUser(
        data.name,
        data.email,
        data.password
      );
      toast.success("User created successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Failed to create user: ${error.message}`);
    }

    setUsers((prevUsers) => [...prevUsers, data]);
    reset();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Manage Users
      </h1>

      {/* Add User Form */}
      <div className="bg-white rounded-sm p-6 ring-1 ring-gray-300 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New User
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
            placeholder="Enter user's name"
            error={errors.name}
            required
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            register={register}
            placeholder="Enter user's email"
            error={errors.email}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            register={register}
            placeholder="Enter password"
            error={errors.password}
            required
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-sm p-6 ring-1 ring-gray-300">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Users List
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-sm p-2 ring-1 ring-gray-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {user.name}
              </h3>
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
