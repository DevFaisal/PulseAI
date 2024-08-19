import React from "react";
import Card from "../Card";

const Header = () => {
  const headers = [
    {
      title: "Patient Info",
      number: "210",
      color: "bg-rose-400",
    },
    {
      title: "Engagement",
      number: "60%",
      color: "bg-purple-600",
    },
    {
      title: "Compliance",
      number: "77%",
      color: "bg-sky-500",
    },
    {
      title: "Improvement",
      number: "84%",
      color: "bg-teal-500",
    },
    {
      title: "Active Patients",
      number: "520",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-5 grid-cols-2 justify-between gap-2">
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
