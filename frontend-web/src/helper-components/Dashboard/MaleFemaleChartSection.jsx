import React, { useEffect, useState } from "react";
import MaleFemalePieChart from "./MaleFemalePieChart";
import {
  getFeedbackGenderRatio,
  getFollowGenderRatio,
} from "@/apis/dashboardRequests";

const MaleFemaleChartSection = () => {
  const [maleFollowers, setMaleFollowers] = useState(4);
  const [maleFeed, setMaleFeed] = useState(55);
  const [femaleFollowers, setFemaleFollowers] = useState(25);
  const [femaleFeed, setFemaleFeed] = useState(41);

  useEffect(() => {
    getFeedbackGenderRatio().then((value) => {
      if (value?.error) console.log(value.error);
      else {
        setFemaleFeed(value.femalePercentage);
        setMaleFeed(value.malePercentage);
      }
    });
    getFollowGenderRatio().then((value) => {
      if (value?.error) console.log(value.error);
      else {
        setFemaleFollowers(value.femalePercentage);
        setMaleFollowers(value.malePercentage);
      }
    });
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
