import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const ForecastWithNoSSR = dynamic(
  () => import("../../components/ForecastComponent"),
  {
    ssr: false,
  }
);

const Forecast: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ForecastWithNoSSR />
    </Suspense>
  );
};

export default Forecast;
