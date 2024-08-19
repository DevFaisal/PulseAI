import React from "react";
import { NavLink } from "react-router-dom";

const Patients = () => {
  const patients = [
    {
      id: "01",
      name: "Ali Adl",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/03/2024",
      providers: "Dr Ahmad",
      conditions: "Mild Fever",
      offTime: "01/02/2024",
      LFC: "01/04/2023",
      LTC: "01/01/2024",
    },
    {
      id: "02",
      name: "Sara Khan",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/05/2024",
      providers: "Dr Aisha",
      conditions: "Diabetes",
      offTime: "01/04/2024",
      LFC: "01/03/2023",
      LTC: "01/01/2024",
    },
    {
      id: "03",
      name: "John Doe",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/07/2024",
      providers: "Dr Asim",
      conditions: "Hypertension",
      offTime: "01/06/2024",
      LFC: "01/05/2023",
      LTC: "01/01/2024",
    },
    {
      id: "04",
      name: "Fatima Sheikh",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/09/2024",
      providers: "Dr Sami",
      conditions: "Asthma",
      offTime: "01/08/2024",
      LFC: "01/07/2023",
      LTC: "01/01/2024",
    },
    {
      id: "05",
      name: "Michael Smith",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/11/2024",
      providers: "Dr Hana",
      conditions: "Arthritis",
      offTime: "01/10/2024",
      LFC: "01/09/2023",
      LTC: "01/01/2024",
    },
    {
      id: "06",
      name: "Nina Brown",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/13/2024",
      providers: "Dr Omar",
      conditions: "Back Pain",
      offTime: "01/12/2024",
      LFC: "01/11/2023",
      LTC: "01/01/2024",
    },
    {
      id: "07",
      name: "Tom Lee",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/15/2024",
      providers: "Dr Sara",
      conditions: "Migraines",
      offTime: "01/14/2024",
      LFC: "01/13/2023",
      LTC: "01/01/2024",
    },
    {
      id: "08",
      name: "Liam White",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/17/2024",
      providers: "Dr Rizwan",
      conditions: "Allergies",
      offTime: "01/16/2024",
      LFC: "01/15/2023",
      LTC: "01/01/2024",
    },
    {
      id: "09",
      name: "Sophia Johnson",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/19/2024",
      providers: "Dr Fatima",
      conditions: "High Cholesterol",
      offTime: "01/18/2024",
      LFC: "01/17/2023",
      LTC: "01/01/2024",
    },
    {
      id: "10",
      name: "Ayesha Malik",
      img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      engagementDate: "01/21/2024",
      providers: "Dr Faraz",
      conditions: "Thyroid Issues",
      offTime: "01/20/2024",
      LFC: "01/19/2023",
      LTC: "01/01/2024",
    },
  ];

  return (
    <div className="bg-white max-w-full h-80 overflow-x-auto overflow-y-scroll flex gap-2 p-2">
      <table className="min-w-full">
        <thead>
          <tr className="grid grid-cols-8 min-w-max bg-gray-200 text-left p-2">
            <th className="whitespace-nowrap">Patient ID</th>
            <th className="whitespace-nowrap">Patient Name</th>
            <th className="whitespace-nowrap">Engagement Date</th>
            <th className="whitespace-nowrap">Providers</th>
            <th className="whitespace-nowrap">Conditions</th>
            <th className="whitespace-nowrap">Off Time</th>
            <th className="whitespace-nowrap">Last Fellow Call</th>
            <th className="whitespace-nowrap">Last Time Call</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <NavLink to={"patient/fds"}>
              <tr
                key={patient.id}
                className="grid grid-cols-8 min-w-max items-center p-2 border-b"
              >
                <td className="whitespace-nowrap">{patient.id}</td>
                <td className="flex items-center gap-2 whitespace-nowrap">
                  <img className="rounded-full" src={patient.img} width={40} />
                  <span>{patient.name}</span>
                </td>
                <td className="whitespace-nowrap">{patient.engagementDate}</td>
                <td className="whitespace-nowrap">{patient.providers}</td>
                <td className="whitespace-nowrap">{patient.conditions}</td>
                <td className="whitespace-nowrap">{patient.offTime}</td>
                <td className="whitespace-nowrap">{patient.LFC}</td>
                <td className="whitespace-nowrap">{patient.LTC}</td>
              </tr>
            </NavLink>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
