import React, { useEffect, useState } from "react";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import { createBlobUrl } from "@/utils/utils";
import { Link } from "react-router-dom";

const UserChatCard = ({ userData, isMobile, chatClicked }) => {
  const [userProfilePicture, setUserProfilePicture] = useState(
    placeholderUserPicture
  );
  useEffect(() => {
    setUserProfilePicture(createBlobUrl(userData.picture.data));
  }, []);

  return (
    <Link
      className="flex items-center gap-4 p-4 border-b-2"
      to={
        !isMobile
          ? `/chatting/${userData.userName}`
          : `/chatting/chat/${userData.userName}`
      }
      onClick={chatClicked}
    >
      <img
        alt="User Picture"
        src={userProfilePicture}
        className="size-10 md:size-12 rounded-full object-cover"
      />

      <h3 className="font-medium text-sm sm:text-lg text-customGreen">
        {userData.userName}
      </h3>
    </Link>
  );
};

export default UserChatCard;
