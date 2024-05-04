import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, ShoppingBagIcon, Star, Users } from "lucide-react";
import { getAvgRate } from "@/apis/dashboardRequests";
import { getFormattedDate } from "@/utils/utils";
import { getNumberOfFollowers } from "@/apis/businessPageRequests";
const NumbersCards = () => {
  const [followersNumber, setFollowersNumber] = useState();
  const [customerServiceRate, setCustomerServiceRate] = useState(0);
  const [valueOfMoneyRate, setValueOfMoneyRate] = useState(0);
  const [productServiceQualityRate, setProductServiceQualityRate] = useState(0);

  useEffect(() => {
    // For 1/1/2023
    const rangeStartDay = new Date(2023, 0, 1);
    // Get date of today
    var rangeLastDay = new Date();

    //get customer service rate
    getAvgRate(
      "rate1",
      getFormattedDate(rangeStartDay),
      getFormattedDate(rangeLastDay)
    ).then((value) => {
      if (value?.error) {
        console.log("An error fetching customer service avergae rate");
      }
      setCustomerServiceRate(value.averageRate);
    });
    //get value of money rate
    getAvgRate(
      "rate2",
      getFormattedDate(rangeStartDay),
      getFormattedDate(rangeLastDay)
    ).then((value) => {
      if (value?.error) {
        console.log("An error fetching value of money rate occured");
      }
      setValueOfMoneyRate(value.averageRate);
    });

    //get product/service quality rate
    getAvgRate(
      "rate3",
      getFormattedDate(rangeStartDay),
      getFormattedDate(rangeLastDay)
    ).then((value) => {
      if (value?.error) {
        console.log("An error fetching product/service quality rate occured");
      }
      setProductServiceQualityRate(value.averageRate);
    });

    //get followers number
    getNumberOfFollowers(
      localStorage.getItem("businessName"),
      localStorage.getItem("accessToken")
    ).then((value) => {
      if (value.error) {
        console.error("Error fetching business followers");
      } else {
        setFollowersNumber(value.followerCount);
      }
    });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium ">
            Followers Number
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {followersNumber}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium">
            Customer Service Rate
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {`${customerServiceRate.toFixed(2)} / 5.00`}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium">
            Value Of Money Rate
          </CardTitle>
          <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {`${valueOfMoneyRate.toFixed(2)} / 5.00`}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customGreen">
          <CardTitle className="text-sm font-medium">
            Product/Service Quality Rate
          </CardTitle>
          <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-customYellow">
            {`${productServiceQualityRate.toFixed(2)} / 5.00`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumbersCards;
