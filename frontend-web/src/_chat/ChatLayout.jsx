import React, { useEffect, useState } from "react";
import UsersChats from "@/helper-components/Messages/UsersChats";
import { Outlet } from "react-router-dom";
import { getBusinessChatPartners } from "@/apis/chatRequests";

const ChatLayout = () => {
  const [chatPartners, setChatPartners] = useState([]);

  useEffect(() => {
    refreshChatPartners();
  }, []);

  const refreshChatPartners = () => {
    getBusinessChatPartners().then((value) => {
      setChatPartners([...value.chatPartners.data]);
    });
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-6 shadow-sm h-screen">
      <div className=" col-span-6 md:col-span-2 p-4 border rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-customPurple">
            Recent Chats
          </h1>

          {/* Button to refresh */}
          <button
            onClick={refreshChatPartners}
            className="bg-customYellow hover:bg-white text-white hover:text-customYellow font-bold py-2 px-4 rounded mt-4 border border-customYellow transition-colors duration-300"
          >
            Refresh Chat Partners
          </button>
        </div>

        {/* search */}
        {/* <UserChatSearch /> */}

        {/* Users Chats */}
        {chatPartners.length > 0 ? (
          <UsersChats chatPartners={chatPartners} />
        ) : (
          <p className="text-center text-gray-500 h-full flex justify-center items-center">
            It seems like you don't have any recent chats. Start a conversation
            with someone to get chatting!
          </p>
        )}
      </div>
      <div className=" col-span-4 hidden md:block px-4 pt-4 border rounded-md relative">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
