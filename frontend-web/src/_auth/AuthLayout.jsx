import { Outlet, Navigate } from "react-router-dom";
import onBoarding from "../assets/images/onboarding.png";
import styles from "./AuthLayout.module.css";

const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <Outlet className={styles.outlet} />
      </div>
      <div className={styles["image-container"]}>
        <img src={onBoarding} className={styles.image} />
      </div>
    </div>
  );
};

export default AuthLayout;
