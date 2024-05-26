import React, { useEffect, useState } from "react";
import UsersChats from "@/helper-components/Messages/UsersChats";
import { Link, Outlet } from "react-router-dom";
import { getBusinessChatPartners } from "@/apis/chatRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

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
          {/* Icon for refresh */}
          <Link
            to="/"
            onClick={refreshChatPartners}
            className="cursor-pointer text-customYellow"
          >
            <FontAwesomeIcon icon={faHouse} size={24} />
          </Link>

          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-customPurple">
              Recent Chats
            </h1>
          </div>

          {/* Icon for refresh */}
          <div
            onClick={refreshChatPartners}
            className="cursor-pointer text-customYellow"
          >
            <FontAwesomeIcon icon={faSyncAlt} size={24} />
          </div>
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
