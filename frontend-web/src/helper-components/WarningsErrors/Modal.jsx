import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ title, message, onClose }) => {
  const handleClosingModal = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
        onClick={handleClosingModal}
      ></div>
      <div className="fixed top-2/4 -translate-y-1/2 left-2/4 -translate-x-1/2 bg-white px-10 pt-8 pb-12 flex flex-col justify-center items-center rounded-2xl">
        <FontAwesomeIcon
          className="absolute right-6 top-6 size-5 cursor-pointer inline-block"
          icon={faX}
          onClick={handleClosingModal}
        />
        <FontAwesomeIcon
          className="text-customRed size-14 py-2"
          icon={faTriangleExclamation}
        />
        <h1 className="text-xl font-semibold text-customRed py-2 text-center">
          {title}
        </h1>
        <p className="text-lg py-2 text-center">{message}</p>
      </div>
    </>
  );
};

export default Modal;
