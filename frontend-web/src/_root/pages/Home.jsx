import React from "react";
import { useLoaderData } from "react-router-dom";
const Home = () => {
  const allFeedback = useLoaderData();
  return (
    <div>
      Home
      {/* we can display allFeedback here */}
    </div>
  );
};

export default Home;

export async function allFeedbackLoader() {
  const response = await fetch("url");
  if (!response.ok) {
    // handle error
  } else {
    const resData = await response.json();
    //return data
    return resData;
  }
}
