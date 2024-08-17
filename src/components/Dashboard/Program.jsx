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
    <div className="bg-white md:w-1/2 rounded-sm p-2">
      <h1 className="text-2xl font-semibold">Program</h1>
      <div className="grid grid-cols-3 gap-2 overflow-scroll">
        {programs?.map((program) => (
          <Card
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
