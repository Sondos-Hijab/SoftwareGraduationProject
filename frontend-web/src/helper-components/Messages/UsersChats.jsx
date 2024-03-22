import React from "react";
import UserChatCard from "./UserChatCard";

const UsersChats = () => {
  return (
    <div className="h-[75vh] overflow-auto">
      <div className="rounded-lg border-2 border-gray-100 bg-white mt-4">
        <UserChatCard />
        <UserChatCard />
        <UserChatCard />
        <UserChatCard />
        <UserChatCard />
        <UserChatCard />
        <UserChatCard />
      </div>
    </div>
  );
};

export default UsersChats;
