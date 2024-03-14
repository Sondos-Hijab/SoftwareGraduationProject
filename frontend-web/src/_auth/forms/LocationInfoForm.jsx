import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LocationForm from "./LocationForm";
import Modal from "@/helper-components/Modal";
import styles from "./LocationInfoForm.module.css";
const LocationInfoForm = () => {
  //routing variables
  const location = useLocation();
  const navigate = useNavigate();
  const userAndBusinessEnteredData = location.state;

  //state management
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Function to handle map click
  const handleMapClick = (lngLat) => {
    console.log(lngLat.detail.latLng);
    setSelectedMarker(lngLat.detail.latLng);
  };

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };

  //handling when clicking the submit button
  const handleDataSubmission = (event) => {
    event.preventDefault();

    // Basic validation
    if (!selectedMarker) {
      setError("Please specify your location.");
      return;
    }

    const dataToSubmit = {
      ...userAndBusinessEnteredData,
      location: `lat: ${selectedMarker.lat}, lng:${selectedMarker.lng}`,
    };
    fetch("http://localhost:3000/RateRelay/user/adminSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode == "409") {
          throw new Error(data.error);
        } else if (data.statusCode == "201") {
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        setModalMessage("There was a problem signing up: " + error.message);
        setShowModal(true);
      });
  };

  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Enter you business's location</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} action="#" method="POST">
            <LocationForm
              handleMapClick={handleMapClick}
              selectedMarker={selectedMarker}
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
            Already have an account?
            <Link to="/sign-in" className={styles["link-text"]}>
              Go to Sign in
            </Link>
          </p>
        </div>
      </div>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </>
  );
};

export default LocationInfoForm;
