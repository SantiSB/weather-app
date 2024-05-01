import React from "react";
import ApexCharts from "react-apexcharts";

interface WeatherDay {
  dt: number;
  main: {
    temp: number; // Asegúrate de que esto está en grados Kelvin si necesitas convertirlo a Celsius
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
    const date = new Date(temp.dt * 1000); // Convertir de timestamp a fecha
    return `${date.getHours()}:00`; // Formato de hora
  });

  const temperatures = hourlyTemperatures.map(
    (temp) => temp.main.temp - 273.15
  ); // Convertir de Kelvin a Celsius si necesario

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
        width="500"
        height="320"
      />
    </div>
  );
};

export default WeatherChart;
