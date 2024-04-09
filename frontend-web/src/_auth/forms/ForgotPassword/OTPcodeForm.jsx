"use client";
import logo from "../../../assets/images/logo.png";
import { useState } from "react";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { useNavigate } from "react-router-dom";
import { styles } from "../FormStyles";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { validateOTP } from "@/apis/authRequests";

export default function InputOTPControlled() {
  const navigate = useNavigate();
  //state management
  const [value, setValue] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmitOTP = async (event) => {
    event.preventDefault();

    if (value.trim().length < 5) {
      return;
    }

    const otpCode = {
      otp: value,
    };

    validateOTP(otpCode).then((value) => {
      if (value.error) {
        setModalMessage("There was a problem checking otp: " + value.error);
        setShowModal(true);
      } else {
        navigate("/auth/reset-password");
      }
    });
  };

  return (
    <>
      <div className={styles.formContainerOTP}>
        <div className={styles.headerInfoContainer}>
          <img src={logo} alt="RateRelay" />
          <h2 className={styles.title}>
            Type the OTP code that we sent you through the email
          </h2>
        </div>

        <div className={styles.innerFormContainer}>
          <div className={styles.form}>
            <InputOTP
              className="my-5"
              maxLength={5}
              value={value}
              onChange={(value) => setValue(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          <div className="text-center text-sm">
            {value === "" ? (
              <>Enter your one-time password.</>
            ) : (
              <>You entered: {value}</>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={styles.otpButton}
          onClick={handleSubmitOTP}
        >
          Submit
        </button>
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
}
