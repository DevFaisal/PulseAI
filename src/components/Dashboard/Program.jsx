import React from "react";
import Card from "../Card";

const Program = ({ className }) => {
  const programs = [
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
    {
      title: "New Enrollment",
      number: 200,
    },
  ];

  return (
    <div className="bg-white md:w-1/2 rounded-lg p-2 ring-1 ring-gray-400">
      <h1 className="text-2xl font-semibold">Program</h1>
      <div className="grid grid-cols-3 gap-2 overflow-scroll">
        {programs?.map((program, index) => (
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
