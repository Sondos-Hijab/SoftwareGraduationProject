import React, { useEffect, useState } from "react";
import AverageRatesChart from "./AverageRatesChart";

const AverageRatesSection = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [rates, setRates] = useState({});

  const generateChart = () => {};
  useEffect(() => {
    //get rates depending in the selected dates
  }, []);

  return (
    <div className="mt-4 shadow-lg rounded-xl md:p-4 flex justify-center flex-col content-center flex-wrap">
      <div className="grid  md:grid-cols-2 lg:grid-cols-5 gap-4 justify-center content-center">
        <div className="flex gap-4 content-center col-span-2 mx-auto lg:mx-0">
          <p className="flex content-center flex-wrap">Pick the start date:</p>
          <input
            type="date"
            className="py-2 px-6 rounded-lg"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-4 content-center col-span-2 mx-auto lg:mx-0">
          <p className="flex content-center flex-wrap">Pick the end date:</p>
          <input
            type="date"
            className="py-2 px-6 rounded-lg "
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>

        <button
          className="py-2 px-4 bg-customGreen block text-white rounded-lg col-span-2 lg:col-span-1"
          onClick={generateChart}
        >
          Generate Chart
        </button>
      </div>
      <AverageRatesChart
        rates={{
          customerService: 25,
          valueOfMoney: 41,
          productServiceRate: 88,
        }}
      />
    </div>
  );
};

export default AverageRatesSection;
