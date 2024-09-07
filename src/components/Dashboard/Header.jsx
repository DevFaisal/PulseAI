import React from "react";
import Card from "../Card";

const Header = () => {
  const headers = [
    {
      title: "  Total Patients",
      number: "210",
      color: "bg-rose-400",
    },
    {
      title: "Critical",
      number: "60%",
      color: "bg-purple-600",
    },
    {
      title: "Follow-Up",
      number: "77%",
      color: "bg-sky-500",
    },
    {
      title: "Improvement",
      number: "84%",
      color: "bg-teal-500",
    },
    {
      title: "New Admissions",
      number: "520",
      color: "bg-amber-500",
    },
    {
      title: "Chronic",
      number: "120",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-6 grid-cols-3 justify-between gap-2">
      {headers?.map((header, index) => (
        <Card
          key={index}
          title={header.title}
          number={header.number}
          color={header.color}
        />
      ))}
    </div>
  );
};

export default Header;
