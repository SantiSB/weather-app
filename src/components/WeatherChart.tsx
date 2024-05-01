"use client";
import { ChartOptions, WeatherChartProps } from "@/types/chart";
import ApexCharts from "react-apexcharts";

const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyTemperatures }) => {
  const categories = hourlyTemperatures.map((temp) => {
    const date = new Date(temp.dt * 1000);
    return `${date.getHours()}:00`;
  });

  const temperatures = hourlyTemperatures.map(
    (temp) => temp.main.temp - 273.15
  );

  const series = [
    {
      name: "Temperatura (°C)",
      data: temperatures,
    },
  ];

  const options: ChartOptions = {
    chart: {
      id: "temperature-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Temperatura (°C)",
      },
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="area"
        width="100%"
        height="320"
      />
    </div>
  );
};

export default WeatherChart;
