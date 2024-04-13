import React, { useEffect, useState } from "react";
import AgeChart from "./AgeChart";
import {
  getFeedbackAgeRatio,
  getFollowAgeRatio,
} from "@/apis/dashboardRequests";
const AgeChartSection = () => {
  const [lessThan18Feed, setLessThan18Feed] = useState(0);
  const [between18and30Feed, setBetween18and30Feed] = useState(0);
  const [moreThan30Feed, setMoreThan30Feed] = useState(0);

  const [lessThan18Follow, setLessThan18Follow] = useState(0);
  const [between18and30Follow, setBetween18and30Follow] = useState(0);
  const [moreThan30Follow, setMoreThan30Follow] = useState(0);

  useEffect(() => {
    getFeedbackAgeRatio().then((value) => {
      if (value?.error) console.log(value.error);
      else {
        setLessThan18Feed(value["below18Percentage"]);
        setBetween18and30Feed(value["age18to30Percentage"]);
        setMoreThan30Feed(value["above30Percentage"]);
      }
    });
    getFollowAgeRatio().then((value) => {
      if (value?.error) console.log(value.error);
      else {
        setLessThan18Follow(value["below18Percentage"]);
        setBetween18and30Follow(value["age18to30Percentage"]);
        setMoreThan30Follow(value["above30Percentage"]);
      }
    });
  }, []);

  return (
    <div className="mb-4 shadow-lg rounded-xl md:p-4 flex justify-center flex-col content-center flex-wrap">
      {/* chart */}
      <AgeChart
        lessThan18={{
          followers: lessThan18Follow,
          writtenFeed: lessThan18Feed,
        }}
        between18and30={{
          followers: between18and30Follow,
          writtenFeed: between18and30Feed,
        }}
        moreThan30={{
          followers: moreThan30Follow,
          writtenFeed: moreThan30Feed,
        }}
        title={"Age Chart"}
      />
    </div>
  );
};

export default AgeChartSection;
