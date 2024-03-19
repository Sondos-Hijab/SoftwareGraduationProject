import { useState, useContext } from "react";
import { appContext as AppContext } from "@/store/app-context";

const AppPovider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // function to handle business name change => when business name is fetched in root layout
  function handleBusinessNameChange(name) {
    setBusinessName(name);
  }

  // funstion to handle access token changes => after successful sign in
  function setFetchedAccessToken(fetchedAccessToken) {
    setAccessToken(fetchedAccessToken);
  }
  // funtions to handle image change
  // when image is fetched in root layout
  function setFetchedImage(image) {
    setProfileImage(image);
  }

  // when image is changed from profile page
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
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile picture");
        }

        //update in ui
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <AppContext.Provider
      value={{
        profileImage,
        handleImageChange,
        businessName,
        handleBusinessNameChange,
        setFetchedImage,
        accessToken,
        setFetchedAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppPovider;

export const useAppContext = () => useContext(AppContext);
