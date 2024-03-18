import LocationForm from "@/_auth/forms/LocationInfoForm/LocationForm";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const EditBusinessLocationModal = ({ setShowModal, setBusinessLocation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [error, setError] = useState("");

  // Function to handle map click
  const handleMapClick = (lngLat) => {
    setSelectedMarker(lngLat);
  };

  async function handleLocationChange(event) {
    event.preventDefault();

    if (!selectedMarker) {
      setError("Please specify your location.");
      return;
    }

    const coordinatesString = Object.entries(selectedMarker)
      .map(([key, value]) => `${key}:${value}`)
      .join(", ");

    const location = {
      location: coordinatesString,
    };
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://localhost:3000/RateRelay/user/updateAdminProfile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(location),
      }
    );
    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage.error);
    } else {
      const data = await response.json();
      console.log(data);
      setBusinessLocation(selectedMarker);
      setShowModal(false);
    }
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
            Edit your business location
          </h1>

          <div className="my-4">
            <LocationForm
              handleMapClick={handleMapClick}
              selectedMarker={selectedMarker}
            />
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
