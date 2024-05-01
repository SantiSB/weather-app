import React from "react";
import ApexCharts from "react-apexcharts";

interface WeatherDay {
  dt: number;
  main: {
    temp: number;
  };
}

interface WeatherChartProps {
  hourlyTemperatures: WeatherDay[];
}

type ChartOptions = {
  chart: {
    id: string;
  };
  xaxis: {
    categories: string[];
  };
  yaxis: {
    title: {
      text: string;
    };
  };
};

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
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: {
        text: "Temperatura (°C)",
      },
    },
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="area"
        width="1000"
        height="320"
      />
    </div>
  );
};

export default WeatherChart;
