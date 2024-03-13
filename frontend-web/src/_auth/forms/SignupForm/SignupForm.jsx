import { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
export default function SignupForm() {
  //routing variables
  const navigate = useNavigate();

  //state management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //handling when clicking the continue button
  function handleUserData(event) {
    event.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userEnteredData = {
      adminName: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    navigate("/business-info", { state: userEnteredData });
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
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="username">Username</label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles["input-container"]}>
            <label htmlFor="password">Password</label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles["input-container"]}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}

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
          <Link className={styles["link-text"]} to="/sign-in">
            {" "}
            Go to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
