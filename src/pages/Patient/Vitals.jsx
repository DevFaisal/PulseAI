import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import clsx from "clsx";
import SplineChart from "../../components/SplineChart";
import PatientInfo from "../../components/Patient/PatientInfo";
import demoData from "../../data/demo.json";
import { useParams } from "react-router-dom";

const Vitals = () => {
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
    {
      Header: "Body Temperature",
      unit: "°F",
      yAxisTitle: "Body Temperature (in °F)",
      dataPoints: [
        { x: new Date(2023, 7, 19, 8, 0), y: 98.6 },
        { x: new Date(2023, 7, 19, 12, 0), y: 98.4 },
        { x: new Date(2023, 7, 19, 16, 0), y: 98.2 },
        { x: new Date(2023, 7, 19, 20, 0), y: 98.8 },
      ],
    },
  ];
  const [category, setCategory] = useState(categories[0].Header);

  const { id } = useParams();

  const patient = demoData.find((u) => {
    return u.patient_id == id;
  });

  const vitals = patient.vitals;

  const medReport = [
    {
      title: "Blood Pressure",
      number:
        vitals.blood_pressure.systolic + "/" + vitals.blood_pressure.diastolic,
      sign: vitals.blood_pressure.unit,
      predicted: vitals.blood_pressure.status,
      time: new Date(vitals.blood_pressure.timestamp).toLocaleString(),
      color: "red",
    },
    {
      title: "Heart Rate",
      number: vitals.heart_rate.bpm,
      sign: "bpm",
      predicted: vitals.heart_rate.status,
      time: new Date(vitals.heart_rate.timestamp).toLocaleString(),
      color: "blue",
    },
    {
      title: "Blood Sugar",
      number: vitals.blood_glucose.level,
      sign: vitals.blood_glucose.unit,
      predicted: vitals.blood_glucose.status,
      time: new Date(vitals.blood_glucose.timestamp).toLocaleString(),
      color: "green",
    },
    {
      title: "Oxygen Saturation",
      number: vitals.oxygen_saturation.spO2,
      sign: vitals.oxygen_saturation.unit,
      predicted: vitals.oxygen_saturation.status,
      time: new Date(vitals.oxygen_saturation.timestamp).toLocaleString(),
      color: "pink",
    },
    {
      title: "Body Temperature",
      number: vitals.body_temperature.temperature,
      sign: vitals.body_temperature.unit,
      predicted: vitals.body_temperature.status,
      time: new Date(vitals.body_temperature.timestamp).toLocaleString(),
      color: "violet",
    },
  ];

  console.log(patient.vitals);

  return (
    <Wrapper>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-4 h-44">
            {/*First Card*/}
            <PatientInfo patient={patient} />
            {/*Second Card*/}
            <div className="bg-white w-1/4 p-4 flex flex-col justify-between rounded-md ring-1 ring-gray-400">
              <h1 className="text-xl font-semibold">
                Monthly Data Compliances
              </h1>
              <div>
                <span className="h-[6px] block rounded-xl w-96 bg-green-500"></span>
                <h2>08 Days of Device data in Aug</h2>
              </div>
            </div>
            {/*Third Card*/}
            <div className="bg-white w-1/4 p-4 flex flex-col justify-between rounded-md ring-1 ring-gray-400">
              <h1 className="text-xl font-semibold">Billing Threshold</h1>
              <div>
                <span className="h-[6px] block rounded-xl w-96 bg-green-500"></span>
                <h2>03 Minutes Reviewed in June</h2>
              </div>
            </div>
          </div>
          <div className="flex gap-4 ">
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
          <div>
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
      <div className="flex gap-1 items-end">
        <h1 className="text-4xl font-bold">{number}</h1>
        <span className="font-semibold text-sm mb-1">{sign}</span>
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex text-xs gap-2 justify-between font-semibold">
          <p>{predicted}</p>
          <p>{time}</p>
        </div>
      </div>
    </button>
  );
}
