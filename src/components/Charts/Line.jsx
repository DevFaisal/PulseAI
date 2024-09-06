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
  data.data = Array.isArray(data.data) ? data.data : [data.data];
  const dataArray = [0, data.data[0], 0, 0];
  const thresholdArray = [0, data.threshold, 0, 0];

  if (data.label === "Blood Pressure") {
    dataArray[1] = data.data[0].split("/")[0];
  }

  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: data?.label || "",
        data: dataArray || [],
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Threshold",
        data: thresholdArray || [],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",

        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: `${data?.label || ""} (${data?.unit || ""})`,
          color: "rgba(75, 85, 99, 1)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
          color: "rgba(75, 85, 99, 1)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white rounded-lg ring-1 ring-gray-400 p-4 sm:p-6 md:p-7 lg:p-8 max-w-full h-[20em] md:h-[30em]">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-3 sm:mb-4">
        {data?.label}
      </h2>
      <div className="w-full h-full">
        <LineChart data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Line;
