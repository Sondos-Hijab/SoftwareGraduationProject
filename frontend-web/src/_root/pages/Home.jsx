import React from "react";
// import { useLoaderData } from "react-router-dom";
const Home = () => {
  // const allFeedback = useLoaderData();
  return (
    <div>
      Home
      {/* we can display allFeedback here */}
    </div>
  );
};

export default Home;

export async function allFeedbackLoader() {
  // const response = await fetch("url");
  // if (!response.ok) {
  //   // handle error
  //   throw new Response(
  //     JSON.stringify({ message: "Couldn't fetch users feedback" }),
  //     { status: 500 }
  //   );
  // } else {
  //   const resData = await response.json();
  //   //return the json object or array
  //   return resData;
  // }
}
