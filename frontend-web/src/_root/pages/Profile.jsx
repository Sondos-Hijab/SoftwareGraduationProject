import React, { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import LocationView from "@/helper-components/Location/LocationView";
import { useAppContext } from "@/Providers/AppPovider";
import EditPhoneNumberModal from "@/helper-components/EditBusinessInfo/EditPhoneNumberModal";
import EditBusinessDescriptionModal from "@/helper-components/EditBusinessInfo/EditBusinessDescriptionModel";
import EditBusinessLocationModal from "@/helper-components/EditBusinessInfo/EditBusinessLocationModal";
import { fetchInfo } from "@/apis/profileAndBusinessInfo";
import { stringToLocationMarker } from "@/utils/utils";

const Profile = () => {
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState(0);
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");

  //functionality
  const { profileImage, handleImageChange, businessName, accessToken } =
    useAppContext();

  const [showEditPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [
    showEditBusinessDescriptionModal,
    setShowEditBusinessDescriptionModal,
  ] = useState(false);

  const [showEditBusinessLocationModal, setShowEditBusinessLocationModal] =
    useState(false);

  useEffect(() => {
    fetchInfo(accessToken).then((businessInfo) => {
      setBusinessDescription(businessInfo["description"]);
      setBusinessPhoneNumber(businessInfo["phoneNumber"]);
      setBusinessCategory(businessInfo["category"]);
      setBusinessLocation(stringToLocationMarker(businessInfo["location"]));
    });
  }, []);

  return (
    <>
      <div className=" mt-8 h-full w-full flex flex-col justify-center items-center">
        {/* profile image */}
        <div className="relative">
          <img
            className="inline-block h-52 w-52 rounded-full border border-gray-300 ring-2 ring-white mx-auto"
            src={profileImage}
            alt="business logo"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer absolute bottom-2 right-6 bg-[#13b6f5] w-10 h-10 rounded-full flex justify-center items-center hover:bg-[#fac100]"
          >
            <FontAwesomeIcon className="text-white" icon={faPen} />
          </label>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* info */}
        <div className="mt-12 w-3/5">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-[#2f47c6] ">
              Business Information
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {businessName}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Phone Number
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{businessPhoneNumber}</p>
                  <FontAwesomeIcon
                    onClick={() => {
                      setShowPhoneNumberModal(true);
                    }}
                    className="cursor-pointer text-[#fac100]"
                    icon={faPen}
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Category
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {businessCategory}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Description
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{businessDescription}</p>
                  <FontAwesomeIcon
                    onClick={() => {
                      setShowEditBusinessDescriptionModal(true);
                    }}
                    className="cursor-pointer text-[#fac100]"
                    icon={faPen}
                  />
                </dd>
              </div>
            </dl>
          </div>

          {/* business location */}
          <div className="px-4 sm:px-0 flex justify-between">
            <h3 className="text-base font-semibold leading-7 text-[#2f47c6]  ">
              Business Location
            </h3>
            <FontAwesomeIcon
              className="cursor-pointer text-[#fac100]"
              icon={faPen}
              onClick={() => {
                setShowEditBusinessLocationModal(true);
              }}
            />
          </div>

          <div className="px-4 py-4 sm:px-0">
            <LocationView position={businessLocation} />
          </div>
        </div>
      </div>

      {showEditPhoneNumberModal ? (
        <EditPhoneNumberModal
          businessPhoneNumber={businessPhoneNumber}
          setBusinessPhoneNumber={setBusinessPhoneNumber}
          setShowModal={setShowPhoneNumberModal}
        />
      ) : (
        ""
      )}
      {showEditBusinessDescriptionModal ? (
        <EditBusinessDescriptionModal
          businessDescription={businessDescription}
          setBusinessDescription={setBusinessDescription}
          setShowModal={setShowEditBusinessDescriptionModal}
        />
      ) : (
        ""
      )}
      {showEditBusinessLocationModal ? (
        <EditBusinessLocationModal
          setBusinessLocation={setBusinessLocation}
          setShowModal={setShowEditBusinessLocationModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
