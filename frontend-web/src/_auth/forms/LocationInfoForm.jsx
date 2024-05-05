import React, { useState, useReducer } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LocationForm from "@/helper-components/Location/LocationForm";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { signup } from "@/apis/authRequests";
import { styles } from "./FormStyles";
import { cities, countries } from "@/constants";
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
  const [selectedCountry, setSelectedCountry] = useState("Palestine");
  const [selectedCity, setSelectedCity] = useState("Nablus");

  // Function to handle map click
  const handleMapClick = (lngLat) => {
    console.log(lngLat);
    setSelectedMarker(lngLat);
  };

  //handling when clicking the submit button
  const handleDataSubmission = (event) => {
    event.preventDefault();

    // Basic validation
    if (!selectedMarker || !selectedCity || !selectedCountry) {
      setError("Please specify your location.");
      return;
    }

    const location = {
      lat: selectedMarker.lat,
      lng: selectedMarker.lng,
      country: selectedCountry,
      city: selectedCity,
    };
    const signupInfo = {
      ...userAndBusinessEnteredData,
      location: JSON.stringify(location),
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

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity(""); // Reset city when country changes
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2 className="text-center">Enter your business location</h2>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} method="POST">
            <LocationForm
              handleMapClick={handleMapClick}
              selectedMarker={selectedMarker}
              width={"600px"}
            />

            <div className="w-[600px] flex justify-between items-center  flex-wrap ">
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="rounded-lg w-80"
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[600px] flex justify-between items-center  flex-wrap">
              <label htmlFor="city">City:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                className="rounded-lg w-80"
              >
                <option value="">Select City</option>
                {cities[selectedCountry].map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
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
            <Link to="/auth/sign-in" className={styles.linkText}>
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
