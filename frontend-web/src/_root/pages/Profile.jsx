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

const modalReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_PHONE_MODAL":
      return { ...state, showEditPhoneNumberModal: action.payload };
    case "TOGGLE_DESCRIPTION_MODAL":
      return { ...state, showEditBusinessDescriptionModal: action.payload };
    case "TOGGLE_LOCATION_MODAL":
      return { ...state, showEditBusinessLocationModal: action.payload };
    default:
      return state;
  }
};

const initialModalState = {
  showEditPhoneNumberModal: false,
  showEditBusinessDescriptionModal: false,
  showEditBusinessLocationModal: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_PHONE_NUMBER":
      return { ...state, businessPhoneNumber: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, businessDescription: action.payload };
    case "SET_CATEGORY":
      return { ...state, businessCategory: action.payload };
    case "SET_LOCATION":
      return { ...state, businessLocation: action.payload };
    default:
      return state;
  }
};

const initialFormState = {
  businessPhoneNumber: 0,
  businessDescription: "",
  businessLocation: "",
  businessCategory: "",
};

const Profile = () => {
  const { profileImage, handleImageChange, businessName, accessToken } =
    useAppContext();

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const togglePhoneModal = () => {
    modalDispatch({
      type: "TOGGLE_PHONE_MODAL",
      payload: !modalState.showEditPhoneNumberModal,
    });
  };

  const toggleDescriptionModal = () => {
    modalDispatch({
      type: "TOGGLE_DESCRIPTION_MODAL",
      payload: !modalState.showEditBusinessDescriptionModal,
    });
  };

  const toggleLocationModal = () => {
    modalDispatch({
      type: "TOGGLE_LOCATION_MODAL",
      payload: !modalState.showEditBusinessLocationModal,
    });
  };

  useEffect(() => {
    fetchInfo(accessToken).then((businessInfo) => {
      formDispatch({
        type: "SET_DESCRIPTION",
        payload: businessInfo.description,
      });
      formDispatch({
        type: "SET_PHONE_NUMBER",
        payload: businessInfo.phoneNumber,
      });
      formDispatch({ type: "SET_CATEGORY", payload: businessInfo.category });
      formDispatch({
        type: "SET_LOCATION",
        payload: stringToLocationMarker(businessInfo.location),
      });
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
                  <p>{formState.businessPhoneNumber}</p>
                  <FontAwesomeIcon
                    onClick={togglePhoneModal}
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
                  {formState.businessCategory}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Description
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{formState.businessDescription}</p>
                  <FontAwesomeIcon
                    onClick={toggleDescriptionModal}
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
              onClick={toggleLocationModal}
            />
          </div>

          <div className="px-4 py-4 sm:px-0">
            <LocationView position={formState.businessLocation} />
          </div>
        </div>
      </div>

      {modalState.showEditPhoneNumberModal ? (
        <EditPhoneNumberModal
          businessPhoneNumber={formState.businessPhoneNumber}
          setBusinessPhoneNumber={(phoneNumber) =>
            formDispatch({ type: "SET_PHONE_NUMBER", payload: phoneNumber })
          }
          setShowModal={togglePhoneModal}
        />
      ) : (
        ""
      )}
      {modalState.showEditBusinessDescriptionModal ? (
        <EditBusinessDescriptionModal
          businessDescription={formState.businessDescription}
          setBusinessDescription={(description) =>
            formDispatch({ type: "SET_DESCRIPTION", payload: description })
          }
          setShowModal={toggleDescriptionModal}
        />
      ) : (
        ""
      )}
      {modalState.showEditBusinessLocationModal ? (
        <EditBusinessLocationModal
          setBusinessLocation={(location) =>
            formDispatch({ type: "SET_LOCATION", payload: location })
          }
          setShowModal={toggleLocationModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
