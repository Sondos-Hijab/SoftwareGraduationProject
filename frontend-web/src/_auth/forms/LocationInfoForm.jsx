import React, { useState, useReducer } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LocationForm from "@/helper-components/Location/LocationForm";
import Modal from "@/helper-components/WarningsErrors/Modal";
import styles from "./Form.module.css";
import { signup } from "@/apis/authRequests";

const initialModalState = {
  showModal: false,
  modalMessage: "",
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showModal: true, modalMessage: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
};

const LocationInfoForm = () => {
  //routing variables
  const location = useLocation();
  const navigate = useNavigate();
  const userAndBusinessEnteredData = location.state;

  //state management
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [error, setError] = useState("");
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  // Function to handle map click
  const handleMapClick = (lngLat) => {
    console.log(lngLat);
    setSelectedMarker(lngLat);
  };

  //handling when clicking the submit button
  const handleDataSubmission = (event) => {
    event.preventDefault();

    // Basic validation
    if (!selectedMarker) {
      setError("Please specify your location.");
      return;
    }

    const signupInfo = {
      ...userAndBusinessEnteredData,
      location: `lat: ${selectedMarker.lat}, lng:${selectedMarker.lng}`,
    };

    signup(signupInfo).then((value) => {
      if (value.error) {
        modalDispatch({
          type: "SHOW_MODAL",
          payload: "There was a problem signing up: " + value.error,
        });
      } else navigate("/auth/sign-in");
    });
  };

  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Enter your business location</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} action="#" method="POST">
            <LocationForm
              handleMapClick={handleMapClick}
              selectedMarker={selectedMarker}
              width={"500px"}
            />

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              onClick={handleDataSubmission}
              className={styles.button}
            >
              Sign up
            </button>
          </form>

          <p className={styles["paragraph-text"]}>
            Already have an account?{" "}
            <Link to="/auth/sign-in" className={styles["link-text"]}>
              Go to Sign in
            </Link>
          </p>
        </div>
      </div>

      {modalState.showModal && (
        <Modal
          title="Can't Sign Your Business Up"
          message={modalState.modalMessage}
          onClose={() => {
            modalDispatch({ type: "HIDE_MODAL" });
          }}
        />
      )}
    </>
  );
};

export default LocationInfoForm;
