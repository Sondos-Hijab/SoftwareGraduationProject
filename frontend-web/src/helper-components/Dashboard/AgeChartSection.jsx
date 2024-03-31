import React, { useEffect, useState } from "react";
import AgeChart from "./AgeChart";
const AgeChartSection = () => {
  const [lessThan18, setlessThan18] = useState({}); //lessThan18.followers lessThan18.writtenFeed
  const [between18and30, setbetween18and30] = useState({});
  const [moreThan30, setMoreThan30] = useState({});

  useEffect(() => {
    //will get numbers to pass them to the age chart
  }, []);

  return (
    <div className="mb-4 shadow-lg rounded-xl md:p-4 flex justify-center flex-col content-center flex-wrap">
      {/* chart */}
      <AgeChart
        lessThan18={{ followers: 18, writtenFeed: 45 }}
        between18and30={{ followers: 50, writtenFeed: 10 }}
        moreThan30={{ followers: 80, writtenFeed: 20 }}
      />
    </div>
  );
};

export default AgeChartSection;
