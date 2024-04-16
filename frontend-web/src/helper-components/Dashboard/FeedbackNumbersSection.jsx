import React, { useEffect, useState } from "react";
import AverageRatesChart from "./AverageRatesChart";
import { getFormattedDate } from "@/utils/utils";
import FeedbackNumbersChart from "./FeedbackNumbersChart";

const FeedbackNumbersSection = () => {
  // For 1/1/current year
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  // For 31/12/current year
  var lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 0);
  const [startDate, setStartDate] = useState(getFormattedDate(firstDayOfYear));
  const [endDate, setEndDate] = useState(getFormattedDate(lastDayOfYear));

  const [positive, setPositive] = useState(20);
  const [neutral, setNeutral] = useState(11);
  const [negative, setNegative] = useState(30);

  const generateChart = () => {};

  useEffect(() => {
    generateChart();
  }, []);

  return (
    <div className="mt-4 shadow-lg rounded-xl md:p-4 flex justify-center flex-col content-center flex-wrap">
      <div className="grid  md:grid-cols-2 lg:grid-cols-5 gap-4 justify-center content-center">
        <div className="flex gap-4 content-center col-span-2 mx-auto lg:mx-0">
          <p className="flex content-center flex-wrap">Pick the start date:</p>
          <input
            defaultValue={getFormattedDate(firstDayOfYear)}
            type="date"
            className="py-2 px-6 rounded-lg"
            onChange={(e) => {
              setStartDate(getFormattedDate(new Date(e.target.value)));
            }}
          />
        </div>
        <div className="flex gap-4 content-center col-span-2 mx-auto lg:mx-0">
          <p className="flex content-center flex-wrap">Pick the end date:</p>
          <input
            defaultValue={getFormattedDate(lastDayOfYear)}
            type="date"
            className="py-2 px-6 rounded-lg "
            onChange={(e) => {
              setEndDate(getFormattedDate(new Date(e.target.value)));
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
      <FeedbackNumbersChart
        numbers={{
          positive: positive,
          neutral: neutral,
          negative: negative,
        }}
        title="Feedback Numbers Chart"
      />
    </div>
  );
};

export default FeedbackNumbersSection;
