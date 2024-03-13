import React, { useState } from "react";
import logo from "../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Modal from "@/helper-components/Modal";
import styles from "./EmailConfirmationForm.module.css";
const EmailConfirmationForm = () => {
  //routing variables
  const navigate = useNavigate();

  //state management
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //closing modal that shows when there is an error
  const closeModal = () => {
    setShowModal(false);
  };

  //handling submitting email
  const handleSubmitEmail = (event) => {
    event.preventDefault();

    // Basic validation
    if (!email) {
      setError("Please fill the email field.");
      return;
    }

    const dataToSubmit = {
      email: email,
    };

    // fetch("http://localhost:3000/RateRelay/user/checkAdminEmail", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataToSubmit),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data.statusCode == "404") {
    //       throw new Error(data.error);
    //     } else if (data.statusCode == "200") {
    //       //i need to store temp token data.tempAccessToken , and username
    //       console.log(data.tempAccessToken);
    //       navigate("/otp-code-form");
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
          <h2>Type your email so we can send you an OTP code</h2>
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
                  }}
                  required
                />
              </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              onClick={handleSubmitEmail}
              className={styles.button}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </>
  );
};

export default EmailConfirmationForm;
