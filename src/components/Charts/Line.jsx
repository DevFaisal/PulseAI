import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  defaults,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale
);

const Line = ({ data }) => {
  console.log(data);
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: data?.label || "",
        data: data?.data || [],
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: data?.label + " (" + data?.unit + ")",
          color: "rgba(75, 85, 99, 1)",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time",
          color: "rgba(75, 85, 99, 1)",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-lg p-7 h-[30em] max-w-full ring-1 ring-gray-400">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">{data?.label}</h2>
      <div className="w-full h-[85%]">
        <LineChart data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Line;
