import logo from "../../../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/helper-components/Modal";
import styles from "../Form.module.css";
import { hasMinLength, isEqualsToOtherValue } from "@/_auth/utils/validation";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [canSubmit, setCanSubmit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!password || !confirmPassword || !canSubmit) {
      return;
    }

    const formData = new FormData(event.target);

    const resetPasswordInfo = {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const response = await fetch(
      "http://localhost:3000/RateRelay/user/resetAdminPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tempAccessToken")}`,
        },
        body: JSON.stringify(resetPasswordInfo),
      }
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      setModalMessage(
        "There was a problem resetting password: " + errorMessage.error
      );
      setShowModal(true);
    } else {
      const data = await response.json();
      console.log(data);
      navigate("/auth/sign-in");
    }
  };

  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Reset your password</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} method="POST" onSubmit={handleSubmit}>
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
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
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

            <button type="submit" className={styles.button}>
              Reset password
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

export default ResetPasswordForm;
