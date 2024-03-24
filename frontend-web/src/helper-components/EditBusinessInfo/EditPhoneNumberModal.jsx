import { useAppContext } from "@/Providers/AppPovider";
import { hasMinLength } from "@/utils/validation";
import { updateInfo } from "@/apis/profileAndBusinessInfo";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const EditPhoneNumberModal = ({
  setShowModal,
  businessPhoneNumber,
  setBusinessPhoneNumber,
}) => {
  const [canSubmit, setCanSubmit] = useState(false);

  const [error, setError] = useState("");

  const { accessToken } = useAppContext();

  async function handlePhoneChange(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const phoneNumberData = {
      phoneNumber: formData.get("phoneNumber"),
    };

    updateInfo(accessToken, phoneNumberData).then((response) => {
      if (response.error) {
        console.log(errorMessage.error);
      } else {
        setBusinessPhoneNumber(formData.get("phoneNumber"));
        setShowModal(false);
      }
    });
  }
  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-[#0000007f]">
      <div className="mx-auto py-16 max-w-screen-xl sm:px-6 lg:px-8 mt-10 sm:mt-0">
        <div className="mx-auto max-w-lg bg-white relative rounded-lg p-10">
          <FontAwesomeIcon
            className="text-gray-600 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer absolute top-2 right-2"
            icon={faXmark}
            onClick={() => {
              setShowModal(false);
            }}
          />

          <h1 className="text-center text-xl font-bold text-[#13b6f5] sm:text-3xl">
            Edit your phone number
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Below is the old value, you can enter the new value and then press
            submit so that the information will be updated.
          </p>

          <form
            onSubmit={handlePhoneChange}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white w-full"
          >
            <p className="text-center text-lg font-medium">
              Enter your updated information
            </p>

            <div>
              <label className="text-sm text-gray-400">
                Current Phone Number
              </label>

              <div>
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={businessPhoneNumber}
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">New Phone Number</label>

              <div>
                <input
                  name="phoneNumber"
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter new value"
                  onChange={(event) => {
                    if (event.target.value == "") {
                      setError("");
                      setCanSubmit(false);
                    } else if (!hasMinLength(event.target.value, 7)) {
                      setError("Phone number can't be less than 7 digits");
                      setCanSubmit(false);
                    } else {
                      setError("");
                      setCanSubmit(true);
                    }
                  }}
                />
              </div>
            </div>
            {error && <p className="text-[#d90429]">{error}</p>}
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

export default EditPhoneNumberModal;
