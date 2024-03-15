import React from "react";
import styles from "./Error.module.css";
// import { useRouteError } from "react-router-dom";

const Error = () => {
  // const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong!";

  // if (error) {
  //   if (error.status === 500) {
  //     message = JSON.parse(error.data).message;
  //   } else if (error.status === 404) {
  //     message = "Couldn't find resource or page.";
  //   }
  // }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.paragraph}>{message}</p>
    </div>
  );
};

export default Error;
