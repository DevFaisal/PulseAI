import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Total Patients
          </h2>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Appointments Today
          </h2>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Pending Reports
          </h2>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>Reviewed patient John Doe's lab results</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </li>
          <li className="flex justify-between">
            <span>Added prescription for Jane Doe</span>
            <span className="text-sm text-gray-500">3 hours ago</span>
          </li>
          <li className="flex justify-between">
            <span>Completed consultation with Ali Doe</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
        </ul>
      </div>

      {/* Patients List Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Assigned Patients
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              John Doe
            </h3>
            <p className="text-gray-600">
              <strong>Age:</strong> 45
            </p>
            <p className="text-gray-600">
              <strong>Symptoms:</strong> Cough, Fever
            </p>
            <p className="text-gray-600">
              <strong>Diagnosis:</strong> Bronchitis
            </p>
          </div>
          <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Jane Doe
            </h3>
            <p className="text-gray-600">
              <strong>Age:</strong> 38
            </p>
            <p className="text-gray-600">
              <strong>Symptoms:</strong> Headache
            </p>
            <p className="text-gray-600">
              <strong>Diagnosis:</strong> Migraine
            </p>
          </div>
          <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Ali Doe
            </h3>
            <p className="text-gray-600">
              <strong>Age:</strong> 30
            </p>
            <p className="text-gray-600">
              <strong>Symptoms:</strong> Fever
            </p>
            <p className="text-gray-600">
              <strong>Diagnosis:</strong> Common Cold
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
