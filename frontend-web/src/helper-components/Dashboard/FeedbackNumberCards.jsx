import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frown, Meh, MessageCircle, Smile } from "lucide-react";
import { getSentimentAnalysisFeedbackStats } from "@/apis/dashboardRequests";

const FeedbackNumbersCards = () => {
  const [totalFeedbackNumber, setTotalFeedbackNumber] = useState(35);
  const [positiveFeedbackNumber, setPositiveFeedbackNumber] = useState(20);
  const [neutralFeedbackNumber, setNeutralFeedbackNumber] = useState(10);
  const [negativeFeedbackNumber, setNegativeFeedbackNumber] = useState(5);

  useEffect(() => {
    getSentimentAnalysisFeedbackStats().then((value) => {
      if (value?.error) {
        console.log("An error fetching feedback stats");
      }
      setTotalFeedbackNumber(value.totalCount);
      setPositiveFeedbackNumber(value.countPositive);
      setNegativeFeedbackNumber(value.countNegative);
      setNeutralFeedbackNumber(value.countNeutral);
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
