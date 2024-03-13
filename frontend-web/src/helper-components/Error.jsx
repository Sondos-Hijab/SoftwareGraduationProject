import React from "react";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>An error occurred!</h1>
      <p className={styles.paragraph}>Could not find this page!</p>
    </div>
  );
};

export default Error;
