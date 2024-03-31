import React, { useEffect, useState } from "react";
import MaleFemalePieChart from "./MaleFemalePieChart";

const MaleFemaleChartSection = () => {
  const [maleFollowers, setMaleFollowers] = useState(4);
  const [maleFeed, setMaleFeed] = useState(55);
  const [femaleFollowers, setFemaleFollowers] = useState(25);
  const [femaleFeed, setFemaleFeed] = useState(41);

  useEffect(() => {
    //get data
  }, []);

  return (
    <div className="mb-2 shadow-lg rounded-xl p-4 flex flex-col lg:flex-row justify-center content-center flex-wrap">
      <MaleFemalePieChart
        male={maleFollowers}
        female={femaleFollowers}
        title="People who are followers"
      />
      <MaleFemalePieChart
        title="People who wrote feedback"
        male={maleFeed}
        female={femaleFeed}
      />
    </div>
  );
};

export default MaleFemaleChartSection;
