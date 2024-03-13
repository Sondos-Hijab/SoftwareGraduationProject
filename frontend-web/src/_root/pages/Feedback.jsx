import React from "react";

const Feedback = () => {
  return <div>Feedback</div>;
};

export default Feedback;

export async function feedbackLoader() {
  const response = await fetch("url");
  if (!response.ok) {
    // handle error
  } else {
    const resData = await response.json();
    //return data
    return resData;
  }
}
