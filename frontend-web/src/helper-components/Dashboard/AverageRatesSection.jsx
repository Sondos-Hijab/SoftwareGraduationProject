import React from "react";
import AverageRatesChart from "./AverageRatesChart";

const AverageRatesSection = () => {
  return (
    <div className="mt-4 shadow-lg rounded-xl md:p-4 flex justify-center flex-col content-center flex-wrap">
      <div className="flex gap-2 flex-col content-center md:gap-2 md:flex-row md:justify-evenly flex-wrap">
        <div className="flex gap-4 content-center">
          <p className="flex content-center flex-wrap">Pick the start date:</p>
          <input type="date" className="py-2 px-6 rounded-lg " />
        </div>
        <div className="flex gap-4 content-center">
          <p className="flex content-center flex-wrap">Pick the end date:</p>
          <input type="date" className="py-2 px-6 rounded-lg " />
        </div>
      </div>
      <AverageRatesChart />
    </div>
  );
};

export default AverageRatesSection;
