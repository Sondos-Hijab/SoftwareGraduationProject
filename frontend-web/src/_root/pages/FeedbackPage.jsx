import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import React from "react";
import { useLocation } from "react-router-dom";

const FeedbackPage = () => {
  let { state } = useLocation();
  return (
    <div className="w-full  mx-28 mt-14">
      <FeedbackCard feedInfo={state} />
    </div>
  );
};

export default FeedbackPage;
