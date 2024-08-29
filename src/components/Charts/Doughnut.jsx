import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut as DoughnutChart } from "react-chartjs-2";

const Doughnut = () => {
  defaults.maintainAspectRatio = true;

  return (
    <div className="bg-white md:w-1/4 rounded-lg p-5 ring-1 ring-gray-400 overflow-hidden">
      <DoughnutChart
        data={{
          labels: ["Ready for Billing", "Submitted", "Issue and Error"],
          datasets: [
            {
              label: "Billing and Claim",
              data: [70, 6, 15],
              backgroundColor: ["#f6ad55", "#68d391", "#f56565"],
              borderColor: ["#f6ad55", "#68d391", "#f56565"],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          animation: {
            animateScale: true,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default Doughnut;
