import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = ({ categories }) => {
  const generateOptions = (category) => {
    return {
      theme: "light2",
      animationEnabled: true,
      title: {
        // text: category.Header,
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
          type: "splineArea",
          yValueFormatString: `#${category.unit}`,
          xValueFormatString: "hh:mm TT",
          color: "skyblue",
          dataPoints: category.dataPoints,
        },
      ],
    };
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg ring-1 ring-gray-400">
      {categories.map((category, index) => (
        <div key={index} className="my-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {category.Header}
          </h2>
          <CanvasJSChart options={generateOptions(category)} />
        </div>
      ))}
    </div>
  );
};

export default SplineChart;
