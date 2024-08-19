import React from "react";
import Wrapper from "../../components/Wrapper";
import Dashboard from "../Dashboard";
import Card from "../../components/Card";

const PatientPage = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 h-44">
            {/*First Card*/}
            <div className="flex items-center justify-between p-4 gap-6 bg-white w-2/3 rounded-md shadow-md">
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-24 h-24 bg-cover"
                  src="https://media.istockphoto.com/id/1472635214/photo/portrait-of-a-beautiful-mixed-race-senior-woman-in-her-home.jpg?s=612x612&w=0&k=20&c=4empJynZ0Yk7a-s4X33IWnQ5-r0SkkH6jU51yGEjAOI="
                  alt="Patient"
                />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold">Stephen West</h1>
                  <p className="text-gray-500">
                    <span>01</span> | <span>Male</span> | <span>72 Years</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Condition</h1>
                <ul className="text-gray-500 list-disc pl-5">
                  <li>High Blood Pressure</li>
                  <li>Fever</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Device</h1>
                <ul className="text-gray-500 list-disc pl-5">
                  <li>Glucometer</li>
                  <li>Thermometer</li>
                </ul>
              </div>
            </div>
            {/*Second Card*/}
            <div className="bg-white w-1/4 p-4 rounded-md shadow-md">
              <h1 className="text-xl font-semibold">Diagnoses</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="p-2 rounded-md bg-sky-500 text-white">
                  Weakness
                </span>
                <span className="p-2 rounded-md bg-sky-500 text-white">
                  Malnutrition
                </span>
                <span className="p-2 rounded-md bg-sky-500 text-white">
                  Hyperlipidemia
                </span>
              </div>
            </div>
            {/*Third Card*/}
            <div className="bg-white w-1/4 p-4 rounded-md  shadow-md">
              <h1 className="text-xl font-semibold">Follow-Up</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="p-2 rounded-md bg-green-500 text-white">
                  Call Scheduled
                </span>
                <span className="p-2 rounded-md bg-green-500 text-white">
                  Medication Updated
                </span>
                <span className="p-2 rounded-md bg-green-500 text-white">
                  Visit Planned
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Card number={"Vitals"} color="bg-red-400" />
            <Card number={"Treatment"} color="bg-blue-400" />
            <Card number={"Appointments"} color="bg-pink-400" />
            <Card number={"Medications"} color="bg-yellow-400" />
            <Card number={"Reports"} color="bg-sky-400" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Current RPM Program</h1>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border-b-2">Program Name</th>
                  <th className="p-2 border-b-2">Start Date</th>
                  <th className="p-2 border-b-2">Duration</th>
                  <th className="p-2 border-b-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Hypertension</td>
                  <td className="p-2 border-b">01-02-2024</td>
                  <td className="p-2 border-b">3 Months</td>
                  <td className="p-2 border-b text-green-600">Active</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Hypertension</td>
                  <td className="p-2 border-b">01-02-2024</td>
                  <td className="p-2 border-b">3 Months</td>
                  <td className="p-2 border-b text-red-600">Disable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Current RPM Program</h1>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border-b-2">Program Name</th>
                  <th className="p-2 border-b-2">Start Date</th>
                  <th className="p-2 border-b-2">Duration</th>
                  <th className="p-2 border-b-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Hypertension</td>
                  <td className="p-2 border-b">01-02-2024</td>
                  <td className="p-2 border-b">3 Months</td>
                  <td className="p-2 border-b text-green-600">Active</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2 border-b">Hypertension</td>
                  <td className="p-2 border-b">01-02-2024</td>
                  <td className="p-2 border-b">3 Months</td>
                  <td className="p-2 border-b text-red-600">Disable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-white w-full h-80 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Current RPM Program</h1>
            <h1>More to be Added</h1>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PatientPage;
