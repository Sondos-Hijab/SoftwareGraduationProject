import { useState, useContext } from "react";
import { appContext as AppContext } from "@/store/app-context";

const AppPovider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [businessName, setBusinessName] = useState("");

  async function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      //update in backend
      try {
        const authToken = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("profilePicture", file);
        console.log(formData.get("profilePicture"));
        const response = await fetch(
          "http://localhost:3000/RateRelay/user/addAdminProfilePicture",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile picture");
        }

        //update in ui
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }

      reader.readAsDataURL(file);
    }
  }

  function handleBusinessNameChange(name) {
    localStorage.setItem("businessName", name);
    setBusinessName(name);
  }

  return (
    <AppContext.Provider
      value={{
        selectedImage,
        handleImageChange,
        businessName,
        handleBusinessNameChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppPovider;

export const useAppContext = () => useContext(AppContext);
