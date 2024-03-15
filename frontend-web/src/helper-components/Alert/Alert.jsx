import React from "react";
import styles from "./Alert.module.css";

const Alert = ({ title, description, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className="alert">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Alert;
