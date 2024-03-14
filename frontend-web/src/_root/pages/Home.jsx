import React, { useContext } from "react";
import { SigninContext } from "../../store/sign-in-context";
// import { useLoaderData } from "react-router-dom";
const Home = () => {
  // const allFeedback = useLoaderData();

  //trying the context
  const signinContext = useContext(SigninContext);
  console.log(signinContext);

  
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
