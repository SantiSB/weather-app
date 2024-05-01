export interface WeatherDay {
    dt: number;
    main: {
        temp: number;
    };
}

export interface WeatherChartProps {
    hourlyTemperatures: WeatherDay[];
}

export type ChartOptions = {
    chart: {
        id: string;
        toolbar: {
            show: boolean;
        };
    };
    xaxis: {
        categories: string[];
        labels: {
            rotate: number;
        };
    };
    yaxis: {
        title: {
            text: string;
        };
        labels: {
            formatter: (value: number) => string;
        };
    };
    responsive: {
        breakpoint: number;
        options: {
            chart: {
                height: number;
            };
            xaxis: {
                labels: {
                    rotate: number;
                };
            };
        };
    }[];
};