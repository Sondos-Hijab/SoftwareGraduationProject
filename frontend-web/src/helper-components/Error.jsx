import React from "react";
import { useRouteError } from "react-router-dom";
import errorImage from "../assets/images/error.png";
const Error = () => {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong!";

  if (error) {
    if (error.data !== undefined) {
      title = `An error of status code ${
        JSON.parse(error.data).statusCode
      } has occured`;
      message = JSON.parse(error.data).error;
    }
  }

  return (
    <div className="text-center mt-12">
      <img
        src={errorImage}
        alt="error"
        width="200px"
        className="mx-auto mb-8"
      />
      <h1 className="text-red-500 text-3xl mb-8">{title}</h1>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default Error;
