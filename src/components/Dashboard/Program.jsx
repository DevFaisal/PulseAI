import React from "react";
import Card from "../Card";

const Program = ({ className }) => {
  const programs = [
    {
      title: "New Enrollment",
      number: 50,
      color: "bg-[#edafb8]",
    },
    {
      title: "Chronic Disease Management",
      number: 120,
      color: "bg-[#6a994e]",
    },
    {
      title: "Post-Surgical Recovery",
      number: 100,
      color: "bg-[#9e2a2b]",
    },
    {
      title: "Cardiac Monitoring",
      number: 80,
      color: "bg-[#168aad]",
    },
    {
      title: "Cancer Treatment Monitoring",
      number: 60,
      color: "bg-[#97d8c4]",
    },
    {
      title: "Respiratory Care Management",
      number: 50,
      color: "bg-[#b6ad90]",
    },
    {
      title: "Pediatric Care",
      number: 40,
      color: "bg-[#f4acb7]",
    },
    {
      title: "Pregnancy and Maternal Health",
      number: 30,
      color: "bg-[#086375]",
    },
  ];

  return (
    <div
      className={`bg-white w-full h-96 overflow-scroll rounded-lg p-4 ring-1 ring-gray-400 ${className}`}
    >
      <h1 className="text-2xl font-semibold mb-4">Program Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-scroll">
        {programs.map((program, index) => (
          <Card
            key={index}
            title={program.title}
            number={program.number}
            color={program.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Program;
