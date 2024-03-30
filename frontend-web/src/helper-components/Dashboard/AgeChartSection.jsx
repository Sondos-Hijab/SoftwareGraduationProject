import React from "react";
import AgeChart from "./AgeChart";
const AgeChartSection = () => {
  return (
    <div className="mb-4 shadow-lg rounded-xl md:p-4 flex justify-center flex-col content-center flex-wrap">
      {/* chart */}
      <AgeChart />
    </div>
  );
};

export default AgeChartSection;
