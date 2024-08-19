import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = ({ categories }) => {
  const generateOptions = (category) => {
    return {
      animationEnabled: true,
      title: {
        text: category.Header,
      },
      axisX: {
        valueFormatString: "hh:mm TT", // Format for time
        title: "Time",
      },
      axisY: {
        title: category.yAxisTitle,
        suffix: ` ${category.unit}`,
      },
      data: [
        {
          yValueFormatString: `#${category.unit}`,
          xValueFormatString: "hh:mm TT", // Format for time
          type: "spline",
          dataPoints: category.dataPoints,
        },
      ],
    };
  };

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className="my-4">
          <CanvasJSChart options={generateOptions(category)} />
        </div>
      ))}
    </div>
  );
};

export default SplineChart;
