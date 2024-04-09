import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { hasMinLength } from "@/utils/validation";
import { styles } from "./FormStyles";
const BusinessInfoForm = () => {
  //routing variables
  const location = useLocation();
  const navigate = useNavigate();
  const userEnteredData = location.state;

  //state management
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  //validation values
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");

  const [canSubmit, setCanSubmit] = useState(false);

  //handle clicking the continue button
  function handleEnteredBusinessInfo(event) {
    event.preventDefault();

    // Basic validation
    if (!category) {
      setCategoryError("You should select a category for your business");
      return;
    }
    if (
      !businessName ||
      !phoneNumber ||
      !description ||
      !category ||
      !canSubmit
    ) {
      return;
    } else {
      const userAndBusinessEnteredData = {
        ...userEnteredData,
        name: businessName,
        phoneNumber: phoneNumber,
        description: description,
        category: category,
      };
      console.log(userAndBusinessEnteredData);
      navigate("/auth/location-info", { state: userAndBusinessEnteredData });
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.headerInfoContainer}>
        <img src={logo} alt="RateRelay" />
        <h2 className={styles.title}>Enter your business Information</h2>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} method="POST">
          <div className={styles.inputContainer}>
            <label htmlFor="businessName">Business name</label>
            <div>
              <input
                className={styles.input}
                id="businessName"
                name="businessName"
                type="text"
                required
                onChange={(event) => {
                  setBusinessName(event.target.value);

                  if (!event.target.value) {
                    setBusinessNameError(
                      "You should enter a name for your business"
                    );
                    setCanSubmit(false);
                  } else {
                    setBusinessNameError("");
                    setCanSubmit(true);
                  }
                }}
              />
            </div>
            {businessNameError && (
              <p className={styles.error}>{businessNameError}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="phoneNumber">Phone number</label>
            <div>
              <input
                className={styles.input}
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                required
                onChange={(event) => {
                  setPhoneNumber(event.target.value);

                  if (event.target.value == "") {
                    setPhoneNumberError("");
                    setCanSubmit(false);
                  } else if (!hasMinLength(event.target.value, 7)) {
                    setPhoneNumberError(
                      "Phone number can't be less than 7 digits"
                    );
                    setCanSubmit(false);
                  } else {
                    setPhoneNumberError("");
                    setCanSubmit(true);
                  }
                }}
              />
            </div>
            {phoneNumberError && (
              <p className={styles.error}>{phoneNumberError}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="description">Description</label>
            <div>
              <textarea
                className={styles.input}
                id="description"
                name="description"
                type="text"
                required
                onChange={(event) => {
                  setDescription(event.target.value);
                  //business description validation
                  if (event.target.value == "") {
                    setDescriptionError("");
                    setCanSubmit(false);
                  } else if (!hasMinLength(event.target.value, 20)) {
                    setDescriptionError(
                      "Description can't be less than 20 digits"
                    );
                    setCanSubmit(false);
                  } else {
                    setDescriptionError("");
                    setCanSubmit(true);
                  }
                }}
              />
            </div>
            {descriptionError && (
              <p className={styles.error}>{descriptionError}</p>
            )}
          </div>

          <div className={styles.category}>
            <label>Category</label>
            <div>
              {["Gym", "Beauty", "Clothes", "Devices", "Restaurants"].map(
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
                    <label className={styles.categoryLabel} htmlFor={cat}>
                      {cat}
                    </label>
                  </div>
                )
              )}
            </div>
            {categoryError && <p className={styles.error}>{categoryError}</p>}
          </div>

          <button
            type="submit"
            onClick={handleEnteredBusinessInfo}
            className={styles.button}
          >
            Continue
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/auth/sign-in" className={styles.linkText}>
            Go to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BusinessInfoForm;
