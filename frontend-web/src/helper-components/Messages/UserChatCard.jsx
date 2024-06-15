import React, { useEffect, useState } from "react";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import { createBlobUrl } from "@/utils/utils";
import { Link } from "react-router-dom";
import { useMessagesContext } from "@/Providers/MessagesProvider";

const UserChatCard = ({ userData, isMobile, chatClicked }) => {
  const [userProfilePicture, setUserProfilePicture] = useState(
    placeholderUserPicture
  );
  const { unseenMessagesCount, resetUnseenMessagesCount } =
    useMessagesContext();

  useEffect(() => {
    setUserProfilePicture(createBlobUrl(userData.picture.data));
  }, []);

  return (
    <div
      onClick={() => {
        resetUnseenMessagesCount(userData.userName);
      }}
    >
      <Link
        className="flex items-center justify-between border-b-2"
        to={
          !isMobile
            ? `/chatting/${userData.userName}`
            : `/chatting/chat/${userData.userName}`
        }
        onClick={chatClicked}
      >
        <div className="inline-flex items-center gap-4 p-4 ">
          <img
            alt="User Picture"
            src={userProfilePicture}
            className="size-10 md:size-12 rounded-full object-cover"
          />

          <h3 className="font-medium text-sm sm:text-lg text-customGreen">
            {userData.userName}
          </h3>
        </div>

        {unseenMessagesCount.get(userData.userName) > 0 && (
          <span className=" bg-red-500 w-6 h-6 rounded-full text-white text-xs flex justify-center items-center mr-2">
            {unseenMessagesCount.get(userData.userName)}
          </span>
        )}
      </Link>
    </div>
  );
};

export default UserChatCard;
