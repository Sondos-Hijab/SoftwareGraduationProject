import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import {
  hasMinLength,
  isEmail,
  isEqualsToOtherValue,
} from "@/_auth/utils/validation";
export default function SignupForm() {
  //routing variables
  const navigate = useNavigate();

  //state management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //validation values
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [canSubmit, setCanSubmit] = useState(false);

  //handling when clicking the continue button
  function handleUserData(event) {
    event.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword || !canSubmit) {
      return;
    }

    const userEnteredData = {
      adminName: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    navigate("/auth/business-info", { state: userEnteredData });
  }

  return (
    <div className={styles["form-container"]}>
      <div className={styles["header-info-container"]}>
        <img src={logo} alt="RateRelay" />
        <h2>Sign up your business</h2>
      </div>

      <div className={styles["form-container"]}>
        <form className={styles.form} action="#" method="POST">
          <div className={styles["input-container"]}>
            <label htmlFor="email">Email address</label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (event.target.value == "") {
                    setEmailError("");
                    setCanSubmit(false);
                  } else if (!isEmail(event.target.value)) {
                    setEmailError("Please enter a valid email");
                    setCanSubmit(false);
                  } else {
                    setEmailError("");
                    setCanSubmit(true);
                  }
                }}
              />
            </div>
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="username">Username</label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                onChange={(event) => {
                  setUsername(event.target.value);

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
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);

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

          <div className={styles["input-container"]}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);

                  if (event.target.value == "") {
                    setConfirmPasswordError("");
                    setCanSubmit(false);
                  } else if (
                    !isEqualsToOtherValue(event.target.value, password)
                  ) {
                    setConfirmPasswordError("Passwords don't match");
                    setCanSubmit(false);
                  } else {
                    setConfirmPasswordError("");
                    setCanSubmit(true);
                  }
                }}
              />
            </div>
            {confirmPasswordError && (
              <p className={styles.error}>{confirmPasswordError}</p>
            )}
          </div>
          <button
            className={styles.button}
            type="submit"
            onClick={handleUserData}
          >
            Continue
          </button>
        </form>

        <p className={styles["paragraph-text"]}>
          Already have an account?
          <Link className={styles["link-text"]} to="/auth/sign-in">
            {" "}
            Go to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
