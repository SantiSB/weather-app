// Importaciones necesarias
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ChartOptions, WeatherChartProps } from "@/types/chart";

// Importa ApexCharts dinámicamente con SSR desactivado
const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Deshabilita server-side rendering para ApexCharts
});

const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyTemperatures }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  // Preparar los datos para los gráficos sólo en el cliente
  useEffect(() => {
    const cat = hourlyTemperatures.map((temp) => {
      const date = new Date(temp.dt * 1000); // Convertir timestamp a objeto Date
      return `${date.getHours()}:00`; // Formatear hora
    });
    const temps = hourlyTemperatures.map(
      (temp) => temp.main.temp - 273.15 // Convertir de Kelvin a Celsius
    );

    setCategories(cat);
    setSeries([
      {
        name: "Temperatura (°C)",
        data: temps,
      },
    ]);
  }, [hourlyTemperatures]);

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
        formatter: (value: number) => value.toFixed(2), // Asegúrate de que el formatter maneje un número
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
