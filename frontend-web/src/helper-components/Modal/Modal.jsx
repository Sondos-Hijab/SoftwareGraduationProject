import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Modal = ({ title, message, onClose }) => {
  const handleOverlayClick = (event) => {
    // Check if the click target is the modal overlay
    if (event.target === event.currentTarget) {
      onClose(); // Call onClose function to close the modal
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" onClick={handleOverlayClick}>
      <Alert className="bg-white rounded-md w-30 h-15" variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-4">{message}</AlertDescription>
      </Alert>
    </div>
  );
};

export default Modal;
