import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import React from "react";

const FeedbackPage = () => {
  return (
    <div className="w-full  mx-28 mt-14">
      <FeedbackCard
        feedInfo={{
          feedbackID: 12,
          userName: "BarneyStinson",
          user_id: 2,
          businessName: "FitFusion Gym",
          admin_id: 1,
          text: "Great atmosphere, feels like a supportive community here.",
          picture: {
            type: "Buffer",
            data: [],
          },
          rate1: 4,
          rate2: 3.5,
          rate3: 5,
          created_at: "2024-04-17T16:23:19.000Z",
          userProfilePicture: {
            type: "Buffer",
            data: [],
          },
        }}
      />
    </div>
  );
};

export default FeedbackPage;
