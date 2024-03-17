import LocationForm from "@/_auth/forms/LocationInfoForm/LocationForm";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const EditBusinessLocationModal = ({ setShowModal }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Function to handle map click
  const handleMapClick = (lngLat) => {
    setSelectedMarker(lngLat);
  };
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

          <button className="block w-full rounded-lg bg-[#13b6f5] px-5 py-3 text-sm font-medium text-white">
            Submit changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessLocationModal;
