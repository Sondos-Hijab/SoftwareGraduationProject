import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./BusinessInfoForm.module.css";
const BusinessInfoForm = () => {
  //routing variables
  const location = useLocation();
  const navigate = useNavigate();
  const userEnteredData = location.state;

  //state management
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  //handle clicking the continue button
  function handleEnteredBusinessInfo(event) {
    event.preventDefault();

    if (!businessName || !phoneNumber || !description || !category) {
      setError("Please fill in all fields.");
      return;
    }

    const userAndBusinessEnteredData = {
      ...userEnteredData,
      name: businessName,
      phoneNumber: phoneNumber,
      description: description,
      category: category,
    };

    navigate("/location-info", { state: userAndBusinessEnteredData });
  }

  return (
    <div className={styles["form-container"]}>
      <div className={styles["header-info-container"]}>
        <img src={logo} alt="RateRelay" />
        <h2>Enter your business Information</h2>
      </div>

      <div className={styles["form-container"]}>
        <form className={styles.form} action="#" method="POST">
          <div className={styles["input-container"]}>
            <label htmlFor="businessName">Business name</label>
            <div>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                onChange={(event) => {
                  setBusinessName(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles["input-container"]}>
            <label htmlFor="phoneNumber">Phone number</label>
            <div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                required
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles["input-container"]}>
            <label htmlFor="description">Description</label>
            <div>
              <textarea
                id="description"
                name="description"
                type="text"
                required
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles.category}>
            <label>Category</label>
            <div>
              {["Gyms", "Beauty", "Clothes", "Devices", "Restaurants"].map(
                (cat) => (
                  <div key={cat} className="flex items-center">
                    <input
                      id={cat}
                      name="category"
                      type="radio"
                      value={cat}
                      checked={category === cat}
                      onChange={(event) => {
                        setCategory(event.target.value);
                      }}
                    />
                    <label htmlFor={cat}>{cat}</label>
                  </div>
                )
              )}
            </div>
          </div>
          {error && <p className={styles["error"]}>{error}</p>}

          <button
            type="submit"
            onClick={handleEnteredBusinessInfo}
            className={styles.button}
          >
            Continue
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
  );
};

export default BusinessInfoForm;
