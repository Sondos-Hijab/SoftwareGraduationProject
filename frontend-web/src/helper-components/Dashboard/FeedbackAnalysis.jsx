import React, { useEffect, useState } from "react";
import MaleFemalePieChart from "./MaleFemalePieChart";
import FeedbackAgeRatioChart from "./FeedbackAgeRatioChart";

const FeedbackAnalysis = () => {
  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [lessThan18, setLessThan18] = useState(0);
  const [between18and30, setBetween18and30] = useState(0);
  const [moreThan30, setMoreThan30] = useState(0);

  useEffect(() => {
    //get values
  }, []);

  return (
    <div className="mb-2 shadow-lg rounded-xl p-4 flex flex-col lg:flex-row justify-center items-center flex-wrap">
      {/* chart */}
      <FeedbackAgeRatioChart
        rates={{ lessThan18: 15, between18and30: 50, moreThan30: 20 }}
        title="Feedback writing age ratio"
      />

      <MaleFemalePieChart
        male={14}
        female={25}
        title="Feedback writing gender ratio"
      />
    </div>
  );
};

export default FeedbackAnalysis;
