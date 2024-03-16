import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, Form } from "react-router-dom";
import styles from "../Form.module.css";
import { hasMinLength } from "@/_auth/utils/validation";

export default function SigninForm({}) {
  //state management and validation
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Sign in to your account</h2>
        </div>

        <div className={styles["form-container"]}>
          <Form className={styles.form} method="POST">
            <div className={styles["input-container"]}>
              <label htmlFor="username">Username</label>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(event) => {
                    if (event.target.value == "") {
                      setUsernameError("");
                      setCanSubmit(false);
                    } else if (!hasMinLength(event.target.value, 5)) {
                      setUsernameError(
                        "Username should be at least 5 characters"
                      );
                      setCanSubmit(false);
                    } else {
                      setUsernameError("");
                      setCanSubmit(true);
                    }
                  }}
                />
              </div>
              {usernameError && <p className={styles.error}>{usernameError}</p>}
            </div>

            <div className={styles["input-container"]}>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(event) => {
                    if (event.target.value == "") {
                      setPasswordError("");
                      setCanSubmit(false);
                    } else if (!hasMinLength(event.target.value, 6)) {
                      setPasswordError(
                        "Password should be at least 6 characters"
                      );
                      setCanSubmit(false);
                    } else {
                      setPasswordError("");
                      setCanSubmit(true);
                    }
                  }}
                />
              </div>
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </div>

            <div className={styles["flex-end"]}>
              <Link to="/auth/confirm-email" className={styles["link-text"]}>
                Forgot password?
              </Link>
            </div>

            <button
              disabled={!canSubmit}
              type="submit"
              className={styles.button}
            >
              Sign in
            </button>
          </Form>

          <p className={styles["paragraph-text"]}>
            Not a member?
            <Link
              to="/auth/sign-up"
              relative="route"
              className={styles["link-text"]}
            >
              {" "}
              Go to Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
