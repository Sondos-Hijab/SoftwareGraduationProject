"use client";
import logo from "../../../assets/images/logo.png";
import styles from "./OTPcodeForm.module.css";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPControlled() {
  //state management
  const [value, setValue] = useState("");

  return (
    <div className={styles["form-container"]}>
      <div className={styles["header-info-container"]}>
        <img src={logo} alt="RateRelay" />
        <h2>Type the OTP code that we sent you through the email</h2>
      </div>

      <div className={styles["inner-form-container"]}>
        <div className={styles["form"]}>
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

        <button type="submit" className={styles["button"]}>
          Submit
        </button>
      </div>
    </div>
  );
}
