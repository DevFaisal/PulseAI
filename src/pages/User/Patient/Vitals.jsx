import React, { useState, useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import clsx from "clsx";
import Line from "../../../components/Charts/Line";
import PatientInfo from "../../../components/Patient/PatientInfo";
import Medication from "../../../components/Patient/Medication";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../../context/FirebaseContext";
import { AlertCircleIcon } from "lucide-react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { FaChevronCircleDown } from "react-icons/fa";

const Vitals = () => {
  const firebase = useFirebase();
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [threshold, setThreshold] = useState({});

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await firebase.getSinglePatient(id);
      setPatient(res);
      setThreshold(res.thresholds);
    };
    fetchPatient();
  }, [id, firebase]);

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
    {
      Header: "Respiratory Rate",
      unit: "bpm",
      yAxisTitle: "Respiratory Rate (in bpm)",
      dataPoints: [
        { x: new Date(2023, 7, 19, 8, 0), y: 16 },
        { x: new Date(2023, 7, 19, 12, 0), y: 18 },
        { x: new Date(2023, 7, 19, 16, 0), y: 20 },
        { x: new Date(2023, 7, 19, 20, 0), y: 22 },
      ],
    },
  ];

  const [category, setCategory] = useState(categories[0].Header);
  const vitals = patient?.vitals || {};

  const medReport = [
    {
      title: "Blood Pressure",
      number: `${vitals.blood_pressure?.systolic || 0}/${
        vitals.blood_pressure?.diastolic || 0
      }`,
      sign: vitals.blood_pressure?.unit || "",
      threshold: {
        low: threshold.blood_pressure?.low || "",
        high: threshold.blood_pressure?.high || "",
      },
      time: vitals.blood_pressure?.timestamp
        ? new Date(vitals.blood_pressure.timestamp).toLocaleString()
        : "",
      color: "red",
    },
    {
      title: "Heart Rate",
      number: vitals.heart_rate?.bpm || 0,
      sign: "bpm",
      threshold: {
        low: threshold.heart_rate?.low || "",
        high: threshold.heart_rate?.high || "",
      },
      time: vitals.heart_rate?.timestamp
        ? new Date(vitals.heart_rate.timestamp).toLocaleString()
        : "",
      color: "blue",
    },
    {
      title: "Blood Sugar",
      number: vitals.blood_glucose?.level || 0,
      sign: vitals.blood_glucose?.unit || "",
      threshold: {
        low: threshold.blood_glucose?.low || "",
        high: threshold.blood_glucose?.high || "",
      },
      time: vitals.blood_glucose?.timestamp
        ? new Date(vitals.blood_glucose.timestamp).toLocaleString()
        : "",
      color: "green",
    },
    {
      title: "Oxygen Saturation",
      number: vitals.oxygen_saturation?.spO2 || 0,
      sign: vitals.oxygen_saturation?.unit || "",
      threshold: {
        low: threshold.oxygen_saturation?.low || "",
        high: threshold.oxygen_saturation?.high || "",
      },
      time: vitals.oxygen_saturation?.timestamp
        ? new Date(vitals.oxygen_saturation.timestamp).toLocaleString()
        : "",
      color: "pink",
    },
    {
      title: "Body Temperature",
      number: vitals.body_temperature?.temperature || 0,
      sign: vitals.body_temperature?.unit || "",
      threshold: {
        low: threshold.body_temperature?.low || "",
        high: threshold.body_temperature?.high || "",
      },
      time: vitals.body_temperature?.timestamp
        ? new Date(vitals.body_temperature.timestamp).toLocaleString()
        : "",
      color: "violet",
    },
    {
      title: "Respiratory Rate",
      number: vitals.respiratory_rate?.rate || 0,
      sign: vitals.respiratory_rate?.unit || "",
      threshold: {
        low: threshold.respiratory_rate?.low || "",
        high: threshold.respiratory_rate?.high || "",
      },
      time: vitals.respiratory_rate?.timestamp
        ? new Date(vitals.respiratory_rate.timestamp).toLocaleString()
        : "",
      color: "red",
    },
  ];

  return (
    <Wrapper>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <PatientInfo patient={patient} />
          <Medication patient={patient} />
          <div className="bg-white p-4 rounded-md ring-1 ring-gray-400">
            <h1 className="text-lg sm:text-xl font-semibold">Threshold</h1>
            <div className="mt-2">
              <div className="flex gap-2">
                <h1 className="font-semibold">Blood Pressure:</h1>
                <h1>
                  {threshold.blood_pressure
                    ? `${threshold.blood_pressure.low}/${threshold.blood_pressure.high}`
                    : "N/A"}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 p-2">
          {medReport.map((rep, index) => (
            <MedInfoCard
              key={index}
              title={rep.title}
              number={rep.number}
              sign={rep.sign}
              threshold={rep.threshold}
              time={rep.time}
              color={rep.color}
              onClick={() => setCategory(rep.title)}
            />
          ))}
        </div>

        <div className="mt-2">
          {categories.map(
            (cat, index) =>
              category.toLowerCase() === cat.Header.toLowerCase() && (
                <Line
                  key={index}
                  data={{
                    label: cat.Header,
                    labels: cat.dataPoints.map((data) =>
                      data.x.toLocaleTimeString()
                    ),
                    data: medReport.filter((rep) => rep.title === cat.Header)[0]
                      .number,
                    unit: cat.unit,
                    threshold: medReport.filter(
                      (rep) => rep.title === cat.Header
                    )[0].threshold,
                  }}
                />
              )
          )}
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
  threshold,
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
        "p-3 sm:p-4 flex flex-col gap-4 flex-grow rounded-xl ring-4 hover:shadow-lg hover:bg-white cursor-pointer whitespace-nowrap transition duration-300",
        colorClasses[color]
      )}
    >
      <div className="flex gap-1 items-end">
        <h1 className="text-3xl sm:text-4xl font-bold">{number}</h1>
        <h1 className="text-sm">{sign}</h1>
      </div>
      <div className="text-left w-full">
        <div className="text-xl font-semibold">{title}</div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1">
            <FaChevronCircleDown />
            {threshold.low}
          </span>
          <span className="flex items-center gap-1">
            <IoIosArrowDropupCircle />
            {threshold.high}
          </span>
        </div>
        <div className="text-xs font-light">
          <span>{time}</span>
        </div>
      </div>
    </button>
  );
}
