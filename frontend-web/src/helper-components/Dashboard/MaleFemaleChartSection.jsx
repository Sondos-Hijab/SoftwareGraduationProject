import React from "react";
import MaleFemalePieChart from "./MaleFemalePieChart";

const MaleFemaleChartSection = () => {
  return (
    <div className="mb-2 shadow-lg rounded-xl p-4 flex flex-col md:flex-row">
      <MaleFemalePieChart title="Male/Female representation of followers" />
      <MaleFemalePieChart title="Male/Female representation of people who wrote feedback" />
    </div>
  );
};

export default MaleFemaleChartSection;

