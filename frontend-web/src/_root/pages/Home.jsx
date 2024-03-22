import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import React from "react";
const Home = () => {
  return (
    <div className="flex flex-col flex-1 justify-center px-10 md:px-20 lg:px-44 py-12">
      <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
        Recent Feedback
      </h2>
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
    </div>
  );
};

export default Home;
