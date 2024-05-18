import React from "react";
import UserChatCard from "./UserChatCard";

const UsersChats = ({ chatPartners }) => {
  return (
    <div className=" overflow-auto h-[80vh]">
      <div className="rounded-lg border-2 border-gray-100 bg-white mt-4">
        {chatPartners.map((partner) => (
          <UserChatCard userData={partner} />
        ))}
      </div>
    </div>
  );
};

export default UsersChats;
