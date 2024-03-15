import { useState, useContext } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@/helper-components/Modal/Modal";
import styles from "./SigninForm.module.css";
import { SigninContext } from "../../../store/sign-in-context";

export default function SigninForm({}) {
  //context
  const { addSigninData } = useContext(SigninContext);

  //routing variables
  const navigate = useNavigate();

  //state management
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };

  //handling when clicking the sign in button
  const handleSigninData = (event) => {
    event.preventDefault();

    // Basic validation
    if (!userName || !password) {
      setError("Please fill all the fields.");
      return;
    }

    const dataToSubmit = {
      adminName: userName,
      password: password,
    };

    addSigninData("Sondos Access Token", "Sondos Hijsb");
    navigate("/");

    // fetch("http://localhost:3000/RateRelay/user/adminLogin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataToSubmit),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data.statusCode == "401" || data.statusCode == "404") {
    //       throw new Error(data.error);
    //     } else if (data.statusCode == "200") {
    //       //i need to store access token data.accessToken , and username
    //       //addSigninData(data.accessToken, data.username);
    //       console.log(data.accessToken);
    //       navigate("/");
    //     }
    //   })
    //   .catch((error) => {
    //     setModalMessage("There was a problem signing up: " + error.message);
    //     setShowModal(true);
    //   });
  };

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
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className={styles["flex-end"]}>
              <Link to="/confirm-email" className={styles["link-text"]}>
                Forgot password?
              </Link>
            </div>
            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              onClick={handleSigninData}
              className={styles.button}
            >
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

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </>
  );
}
