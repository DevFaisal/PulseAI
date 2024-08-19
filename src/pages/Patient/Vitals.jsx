import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import Card from "../../components/Card";
import clsx from "clsx";
import SplineChart from "../../components/SplineChart";

const Vitals = () => {
  const medReport = [
    {
      title: "Blood Pressure",
      number: "150/23",
      sign: "mmHg",
      predicted: "4% Higher",
      time: "01-02-2203",
      color: "red",
    },
    {
      title: "Heart Rate",
      number: "75",
      sign: "bpm",
      predicted: "Normal",
      time: "01-02-2203",
      color: "blue",
    },
    {
      title: "Blood Sugar",
      number: "110",
      sign: "mg/dL",
      predicted: "Stable",
      time: "01-02-2203",
      color: "green",
    },
    {
      title: "Oxygen Saturation",
      number: "98",
      sign: "%",
      predicted: "Normal",
      time: "01-02-2203",
      color: "pink",
    },
    {
      title: "Cholesterol",
      number: "200",
      sign: "mg/dL",
      predicted: "Borderline",
      time: "01-02-2203",
      color: "violet",
    },
  ];
  const categories = [
    {
      Header: "Blood Pressure",
      unit: "mmHg",
      yAxisTitle: "Blood Pressure (in mmHg)",
      dataPoints: [
        { x: new Date(2023, 7, 19, 8, 0), y: 120 },
        { x: new Date(2023, 7, 19, 12, 0), y: 125 },
        { x: new Date(2023, 7, 19, 16, 0), y: 130 },
        { x: new Date(2023, 7, 19, 20, 0), y: 115 },
      ],
    },
    {
      Header: "Heart Rate",
      unit: "bpm",
      yAxisTitle: "Heart Rate (in bpm)",
      dataPoints: [
        { x: new Date(2023, 7, 19, 8, 0), y: 75 },
        { x: new Date(2023, 7, 19, 12, 0), y: 80 },
        { x: new Date(2023, 7, 19, 16, 0), y: 78 },
        { x: new Date(2023, 7, 19, 20, 0), y: 76 },
      ],
    },
    {
      Header: "Blood Sugar",
      unit: "mg/dL",
      yAxisTitle: "Blood Sugar (in mg/dL)",
      dataPoints: [
        { x: new Date(2023, 7, 19, 8, 0), y: 110 },
        { x: new Date(2023, 7, 19, 12, 0), y: 115 },
        { x: new Date(2023, 7, 19, 16, 0), y: 120 },
        { x: new Date(2023, 7, 19, 20, 0), y: 118 },
      ],
    },
    {
      Header: "Oxygen Saturation",
      unit: "%",
      yAxisTitle: "Oxygen Saturation (in %)",
      dataPoints: [
        { x: new Date(2023, 7, 19, 8, 0), y: 98 },
        { x: new Date(2023, 7, 19, 12, 0), y: 97 },
        { x: new Date(2023, 7, 19, 16, 0), y: 96 },
        { x: new Date(2023, 7, 19, 20, 0), y: 99 },
      ],
    },
  ];
  const [category, setCategory] = useState(categories[0].Header);

  return (
    <Wrapper>
      <div>
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
            <div className="bg-white w-1/4 p-4 flex flex-col justify-between rounded-md shadow-md">
              <h1 className="text-xl font-semibold">
                Monthly Data Compliances
              </h1>
              <div>
                <span className="h-[6px] block rounded-xl w-96 bg-green-500"></span>
                <h2>08 Days of Device data in Aug</h2>
              </div>
            </div>
            {/*Third Card*/}
            <div className="bg-white w-1/4 p-4 flex flex-col justify-between rounded-md shadow-md">
              <h1 className="text-xl font-semibold">Billing Threshold</h1>
              <div>
                <span className="h-[6px] block rounded-xl w-96 bg-green-500"></span>
                <h2>03 Minutes Reviewed in June</h2>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {medReport?.map((rep, index) => (
              <MedInfoCard
                key={index}
                title={rep.title}
                number={rep.number}
                sign={rep.sign}
                predicted={rep.predicted}
                time={rep.time}
                color={rep.color}
                onClick={() => {
                  setCategory(rep.title);
                }}
              />
            ))}
          </div>
          <div className="bg-white p-4">
            {categories?.map(
              (cat, index) =>
                category.toLowerCase() === cat.Header.toLowerCase() && (
                  <SplineChart key={index} categories={[cat]} />
                )
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Vitals;

export function MedInfoCard({
  title,
  number,
  sign,
  predicted,
  time,
  color,
  onClick,
}) {
  const colorClasses = {
    red: "bg-red-200 text-red-600 ring-red-600",
    blue: "bg-blue-200 text-blue-600 ring-blue-600",
    green: "bg-green-200 text-green-600 ring-green-600",
    pink: "bg-pink-200 text-pink-600 ring-pink-600",
    violet: "bg-violet-200 text-violet-600 ring-violet-600",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-4 ring-4 flex flex-col flex-grow justify-between gap-4 rounded-xl hover:shadow-lg shadow-black hover:bg-white hover:cursor-pointer duration-500",
        colorClasses[color]
      )}
    >
      
      <div className="flex gap-3 items-center">
        <h1 className="text-4xl font-bold">{number}</h1>
        <span className="font-semibold">{sign}</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex text-xs gap-2 justify-between font-semibold">
          <p>{predicted}</p>
          <p>{time}</p>
        </div>
      </div>
    </button>
  );
}
