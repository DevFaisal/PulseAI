import React from "react";
import Card from "../Card";

const Program = ({ className }) => {
  const programs = [
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#edafb8]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#6a994e]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#9e2a2b]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#168aad]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#97d8c4]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#b6ad90]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#f4acb7]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#086375]",
    },
    {
      title: "New Enrollment",
      number: 200,
      color: "bg-[#227c9d]",
    },
  ];

  return (
    <div className="bg-white md:w-1/2 rounded-lg p-2 ring-1 ring-gray-400">
      <h1 className="text-2xl font-semibold">Program</h1>
      <div className="grid grid-cols-3 gap-2 overflow-scroll p-2">
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
