import React, { useEffect, useState } from "react";
import MaleFemalePieChart from "./MaleFemalePieChart";
import FeedbackAgeRatioChart from "./FeedbackAgeRatioChart";
import {
  getFeedbackAgeRatio,
  getFeedbackGenderRatio,
} from "@/apis/dashboardRequests";

const FeedbackAnalysis = () => {
  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [lessThan18, setLessThan18] = useState(0);
  const [between18and30, setBetween18and30] = useState(0);
  const [moreThan30, setMoreThan30] = useState(0);

  useEffect(() => {
    getFeedbackAgeRatio().then((value) => {
      if (value?.error) console.log(value.error);
      else {
        setLessThan18(value["below18Percentage"]);
        setBetween18and30(value["age18to30Percentage"]);
        setMoreThan30(value["above30Percentage"]);
      }
    });
    getFeedbackGenderRatio().then((value) => {
      if (value?.error) console.log(value.error);
      else {
        setFemale(value.femalePercentage);
        setMale(value.malePercentage);
      }
    });
  }, []);

  return (
    <div className="mb-2 shadow-lg rounded-xl p-4 flex flex-col lg:flex-row justify-center items-center flex-wrap">
      {/* chart */}
      <FeedbackAgeRatioChart
        rates={{
          lessThan18: lessThan18,
          between18and30: between18and30,
          moreThan30: moreThan30,
        }}
        title="Feedback writing age ratio"
      />

      <MaleFemalePieChart
        male={male}
        female={female}
        title="Feedback writing gender ratio"
      />
    </div>
  );
};

export default FeedbackAnalysis;
