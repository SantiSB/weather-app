import React from "react";
import ApexCharts from "react-apexcharts";

type ChartOptions = {
  chart: {
    id: string;
  };
  xaxis: {
    categories: string[];
  };
};

const WeatherChart: React.FC = () => {
  const series = [
    {
      name: "temperatura",
      data: [20, 22, 26, 28, 25, 22],
    },
  ];

  const options: ChartOptions = {
    chart: {
      id: "basic-area",
    },
    xaxis: {
      categories: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    },
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="area"
        width="500"
        height="320"
      />
    </div>
  );
};

export default WeatherChart;
