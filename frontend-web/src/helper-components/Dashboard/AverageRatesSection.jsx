import React, { useEffect, useState } from "react";
import AverageRatesChart from "./AverageRatesChart";
import { getFormattedDate } from "@/utils/utils";
import { getAvgRate } from "@/apis/dashboardRequests";

const AverageRatesSection = () => {
  // For 1/1/current year
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  // For 31/12/current year
  var lastDayOfYear = new Date(new Date().getFullYear() + 1, 0, 0);
  const [startDate, setStartDate] = useState(getFormattedDate(firstDayOfYear));
  const [endDate, setEndDate] = useState(getFormattedDate(lastDayOfYear));

  const [customerServiceRate, setCustomerServiceRate] = useState(0);
  const [valueOfMoneyRate, setValueOfMoneyRate] = useState(0);
  const [productServiceQualityRate, setProductServiceQualityRate] = useState(0);

  const generateChart = () => {
    //get customer service rate
    getAvgRate("rate1", startDate, endDate).then((value) => {
      if (value?.error) {
        console.log("An error fetching customer service avergae rate");
      }
      setCustomerServiceRate(value.averageRate);
    });
    //get value of money rate
    getAvgRate("rate2", startDate, endDate).then((value) => {
      if (value?.error) {
        console.log("An error fetching value of money rate occured");
      }
      setValueOfMoneyRate(value.averageRate);
    });

    //get product/service quality rate
    getAvgRate("rate3", startDate, endDate).then((value) => {
      if (value?.error) {
        console.log("An error fetching product/service quality rate occured");
      }
      setProductServiceQualityRate(value.averageRate);
    });
  };

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
      <AverageRatesChart
        rates={{
          customerService: customerServiceRate,
          valueOfMoney: valueOfMoneyRate,
          productServiceRate: productServiceQualityRate,
        }}
        title="Average Rates Chart"
      />
    </div>
  );
};

export default AverageRatesSection;
