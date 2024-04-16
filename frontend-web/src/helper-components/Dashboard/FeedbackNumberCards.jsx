import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frown, Meh, MessageCircle, Smile } from "lucide-react";
import { getAvgRate } from "@/apis/dashboardRequests";
import { getFormattedDate } from "@/utils/utils";
import { getNumberOfFollowers } from "@/apis/businessPageRequests";
const FeedbackNumbersCards = () => {
  const [totalFeedbackNumber, setTotalFeedbackNumber] = useState();
  const [positiveFeedbackNumber, setPositiveFeedbackNumber] = useState(0);
  const [neutralFeedbackNumber, setNeutralFeedbackNumber] = useState(0);
  const [negativeFeedbackNumber, setNegativeFeedbackNumber] = useState(0);

  useEffect(() => {
    // For 1/1/2023
    const rangeStartDay = new Date(2023, 0, 1);
    // Get date of today
    var rangeLastDay = new Date();

    //get total feedback number
    getAvgRate(
      "rate1",
      getFormattedDate(rangeStartDay),
      getFormattedDate(rangeLastDay)
    ).then((value) => {
      if (value?.error) {
        console.log("An error fetching customer service avergae rate");
      }
      setPositiveFeedbackNumber(value.averageRate);
    });
    //get positive feedback number
    getAvgRate(
      "rate2",
      getFormattedDate(rangeStartDay),
      getFormattedDate(rangeLastDay)
    ).then((value) => {
      if (value?.error) {
        console.log("An error fetching value of money rate occured");
      }
      setNegativeFeedbackNumber(value.averageRate);
    });

    //get neutral feedback number
    getAvgRate(
      "rate3",
      getFormattedDate(rangeStartDay),
      getFormattedDate(rangeLastDay)
    ).then((value) => {
      if (value?.error) {
        console.log("An error fetching product/service quality rate occured");
      }
      setNeutralFeedbackNumber(value.averageRate);
    });

    //get negative feedback number
    getNumberOfFollowers(
      localStorage.getItem("businessName"),
      localStorage.getItem("accessToken")
    ).then((value) => {
      if (value.error) {
        console.error("Error fetching business followers");
      } else {
        setTotalFeedbackNumber(value.followerCount);
      }
    });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium ">
            Total Number Of Feedback
          </CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {totalFeedbackNumber}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium">
            Positive Feedback Number
          </CardTitle>
          <Smile className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {positiveFeedbackNumber}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium">
            Neutral Feedback Number
          </CardTitle>
          <Meh className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {neutralFeedbackNumber}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium">
            Negative Feedback Number
          </CardTitle>
          <Frown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {negativeFeedbackNumber}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackNumbersCards;
