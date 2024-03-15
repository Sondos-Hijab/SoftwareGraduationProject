import logo from "../../../../assets/images/logo.png";
import styles from "./ResetPasswordForm.module.css";
const ResetPasswordForm = () => {
  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Reset your password</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} action="#" method="POST">
            <div className={styles["input-container"]}>
              <label htmlFor="password">Password</label>
              <div>
                <input id="password" name="password" type="password" required />
              </div>
            </div>

            <div className={styles["input-container"]}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Reset password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
