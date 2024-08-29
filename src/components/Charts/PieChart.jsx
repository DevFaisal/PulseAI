import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {
  const options = {
    animationEnabled: true,
    title: {
      // text: "Billing and Claim",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 12,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 70, label: "Ready for Billing" },
          { y: 6, label: "Submitted" },
          { y: 15, label: "Issue and Error" },
        ],
      },
    ],
  };

  return (
    <div className="bg-white md:w-1/4 rounded-lg ring-1 ring-gray-400 overflow-hidden">
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieChart;
