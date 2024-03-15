import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

export default function SigninForm({}) {
  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Sign in to your account</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} action="#" method="POST">
            <div className={styles["input-container"]}>
              <label htmlFor="username">Username</label>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(event) => {}}
                />
              </div>
            </div>

            <div className={styles["input-container"]}>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(event) => {}}
                />
              </div>
            </div>

            <div className={styles["flex-end"]}>
              <Link to="/confirm-email" className={styles["link-text"]}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.button}>
              Sign in
            </button>
          </form>

          <p className={styles["paragraph-text"]}>
            Not a member?
            <Link to="/sign-up" className={styles["link-text"]}>
              {" "}
              Go to Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
