import { useState, useContext } from "react";
import { appContext as AppContext } from "@/store/app-context";
import { updateImage } from "@/apis/profileAndBusinessInfo";

const AppPovider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // function to handle business name change => when business name is fetched in root layout
  function handleBusinessNameChange(name) {
    setBusinessName(name);
  }

  // function to handle access token changes => after successful sign in
  function setFetchedAccessToken(fetchedAccessToken) {
    setAccessToken(fetchedAccessToken);
  }
  // funtions to handle image change

  // when image is fetched in root layout
  function setFetchedImage(image) {
    setProfileImage(image);
    localStorage.setItem("businessProfilePicture", image);
  }

  // when image is changed from profile page
  async function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      updateImage(accessToken, file).then((value) => {
        if (value.error) console.log("Failed to update profile picture");
        else {
          reader.onloadend = () => {
            setProfileImage(reader.result);
            localStorage.setItem("businessProfilePicture", reader.result);
          };
          reader.readAsDataURL(file);
        }
      });
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
