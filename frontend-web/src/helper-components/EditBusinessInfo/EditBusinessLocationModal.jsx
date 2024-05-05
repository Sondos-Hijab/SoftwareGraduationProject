import LocationForm from "@/helper-components/Location/LocationForm";
import { updateInfo } from "@/apis/profileAndBusinessInfo";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAppContext } from "@/Providers/AppPovider";
import { cities, countries } from "@/constants";
const EditBusinessLocationModal = ({ setShowModal, setBusinessLocation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Palestine");
  const [selectedCity, setSelectedCity] = useState("Nablus");

  const { accessToken } = useAppContext();

  // Function to handle map click
  const handleMapClick = (lngLat) => {
    setSelectedMarker(lngLat);
  };

  async function handleLocationChange(event) {
    event.preventDefault();

    if (!selectedMarker || !selectedCity || !selectedCountry) {
      setError("Please specify your location.");
      return;
    }

    const coordinatesString = {
      lat: selectedMarker.lat,
      lng: selectedMarker.lng,
      country: selectedCountry,
      city: selectedCity,
    };

    const location = {
      location: JSON.stringify(coordinatesString),
    };

    updateInfo(accessToken, location).then((response) => {
      if (response.error) {
        console.log(errorMessage.error);
      } else {
        setBusinessLocation(selectedMarker);
        setShowModal(false);
      }
    });
  }
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity(""); // Reset city when country changes
  };
  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-[#0000007f]">
      <div className="mx-auto py-16 max-w-screen-xl sm:px-6 lg:px-8 mt-10 sm:mt-0">
        <div className="mx-auto max-w-lg bg-white relative rounded-lg p-10">
          <FontAwesomeIcon
            className="text-gray-600 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer absolute top-4 right-4"
            icon={faXmark}
            onClick={() => {
              setShowModal(false);
            }}
          />

          <h1 className="text-center text-xl font-bold text-[#13b6f5] sm:text-3xl">
            Edit your business location
          </h1>

          <div className="my-4">
            <LocationForm
              handleMapClick={handleMapClick}
              selectedMarker={selectedMarker}
            />
          </div>
          <div className="flex-1 flex justify-between items-center  flex-wrap pb-3 ">
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
          <div className="flex-1 flex justify-between items-center  flex-wrap pb-3">
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
          {error && <p className="text-[#d90429]">{error}</p>}

          <button
            onClick={handleLocationChange}
            className="block w-full rounded-lg bg-[#13b6f5] px-5 py-3 text-sm font-medium text-white"
          >
            Submit changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessLocationModal;
