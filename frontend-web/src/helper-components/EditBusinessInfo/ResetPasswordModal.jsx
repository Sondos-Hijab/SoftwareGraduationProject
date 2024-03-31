import { useAppContext } from "@/Providers/AppPovider";
import { hasMinLength, isEqualsToOtherValue } from "@/utils/validation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { resetPasswordProfile } from "@/apis/authRequests";

const ResetPasswordModal = ({ setShowModal }) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { accessToken } = useAppContext();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleResetPassword(event) {
    event.preventDefault();

    resetPasswordProfile(accessToken, {
      password: password,
      confirmPassword: confirmPassword,
    }).then((response) => {
      if (response.error) console.log(response.error);
      else setShowModal();
    });
  }
  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-[#0000007f]">
      <div className="mx-auto py-16 max-w-screen-xl sm:px-6 lg:px-8 mt-10 sm:mt-0">
        <div className="mx-auto max-w-lg bg-white relative rounded-lg p-10">
          <FontAwesomeIcon
            className="text-gray-600 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer absolute top-4 right-4"
            icon={faXmark}
            onClick={() => {
              setShowModal();
            }}
          />

          <h1 className="text-center text-xl font-bold text-[#13b6f5] sm:text-3xl">
            Edit your password
          </h1>

          <form
            onSubmit={handleResetPassword}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8 bg-white w-full"
          >
            <p className="text-center text-lg font-medium">
              Enter your new password
            </p>

            <div>
              <label className="text-sm text-gray-400">Password</label>

              <div>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (event.target.value == "") {
                      setPasswordError("");
                      setCanSubmit(false);
                    } else if (!hasMinLength(event.target.value, 6)) {
                      setPasswordError(
                        "Password can't be less than 6 characters"
                      );
                      setCanSubmit(false);
                    } else {
                      setPasswordError("");
                      setCanSubmit(true);
                    }
                  }}
                />
              </div>
              {passwordError && (
                <p className="text-[#d90429]">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-400">Confirm password</label>

              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
            </div>
            {confirmPasswordError && (
              <p className="text-[#d90429]">{confirmPasswordError}</p>
            )}
            <button
              type="submit"
              disabled={!canSubmit}
              className="block w-full rounded-lg bg-[#13b6f5] px-5 py-3 text-sm font-medium text-white"
            >
              Submit changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
