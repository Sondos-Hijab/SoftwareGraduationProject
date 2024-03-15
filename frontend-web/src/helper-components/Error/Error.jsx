import React from "react";
import styles from "./Error.module.css";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong, The path provided doesn't exist!";

  if (error) {
    if (error.data !== undefined) {
      title = `An error of status code ${
        JSON.parse(error.data).statusCode
      } has occured`;
      message = JSON.parse(error.data).error;
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.paragraph}>{message}</p>
    </div>
  );
};

export default Error;
