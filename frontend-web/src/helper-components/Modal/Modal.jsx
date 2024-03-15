import React from "react";
import "./Modal.css";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Modal = ({ message, onClose }) => {
  const handleOverlayClick = (event) => {
    // Check if the click target is the modal overlay
    if (event.target === event.currentTarget) {
      onClose(); // Call onClose function to close the modal
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <Alert className="modal" variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
};

export default Modal;


