import React from "react";
import UserChatCard from "./UserChatCard";

const UsersChats = ({ chatPartners, isMobile, chatClicked }) => {
  return (
    <div className=" overflow-auto h-[80vh]">
      <div className="rounded-lg border-2 border-gray-100 bg-white mt-4">
        {chatPartners.map((partner) => (
          <UserChatCard
            key={partner.userName}
            userData={partner}
            isMobile={isMobile}
            chatClicked={chatClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersChats;
