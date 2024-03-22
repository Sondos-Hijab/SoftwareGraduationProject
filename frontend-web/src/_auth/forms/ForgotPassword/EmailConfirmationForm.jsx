import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import styles from "../Form.module.css";
import { isEmail } from "@/_auth/utils/validation";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { useNavigate } from "react-router-dom";
import { confirmEmail } from "@/apis/authRequests";

const EmailConfirmationForm = () => {
  const navigate = useNavigate();

  //state management
  const [error, setError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const emailCofirmationData = {
      email: formData.get("email"),
    };

    confirmEmail(emailCofirmationData).then((value) => {
      if (value.error) {
        setModalMessage("There was a problem confirming email: " + value.error);
        setShowModal(true);
      } else {
        navigate("/auth/otp-code-form");
      }
    });
  };
  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Type your email so we can send you an OTP code</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} method="POST" onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email address</label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(event) => {
                    if (event.target.value == "") {
                      setError("");
                      setCanSubmit(false);
                    } else if (!isEmail(event.target.value)) {
                      setError("Please enter a valid email");
                      setCanSubmit(false);
                    } else {
                      setError("");
                      setCanSubmit(true);
                    }
                  }}
                  required
                />
              </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              className={styles.button}
              disabled={!canSubmit}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Can't continue the process of resetting password"
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default EmailConfirmationForm;
