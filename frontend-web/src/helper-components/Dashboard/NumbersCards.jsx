import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, ShoppingBagIcon, Star, Users } from "lucide-react";
const NumbersCards = () => {
  const [followersNumber, setFollowersNumber] = useState();
  const [valueOfMoneyRateAverage, setValueOfMoneyRateAverage] = useState();
  const [productServiceRateAverage, setProductServiceRateAverage] = useState();
  const [customerServiceRateAverage, setCustomerServiceRateAverage] =
    useState();

  useEffect(() => {
    //fetch numbers and set them in the cards
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
          <div className="text-2xl font-bold text-customYellow">75</div>
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
          <div className="text-2xl font-bold text-customYellow">85%</div>
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
          <div className="text-2xl font-bold text-customYellow">23%</div>
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
          <div className="text-2xl font-bold text-customYellow">52%</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumbersCards;
