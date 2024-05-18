import React, { useEffect, useState } from "react";
import UsersChats from "@/helper-components/Messages/UsersChats";
import { Outlet } from "react-router-dom";
import { addChatMessage, getBusinessChatPartners } from "@/apis/chatRequests";

const ChatLayout = () => {
  const [chatPartners, setChatPartners] = useState([]);

  useEffect(() => {
    // addChatMessage({
    //   userName: "LorelaiG",
    //   businessName: "BeFit",
    //   sender: "1",
    //   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum impedit rerum quos? Impedit rerum odit esse et, repellat magni a rem ab praesentium fugit maiores cumque quas excepturi illum architecto!",
    // }).then((val) => {
    //   console.log(val);
    // });
    getBusinessChatPartners().then((value) => {
      setChatPartners(value.chatPartners.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 p-6 shadow-sm h-screen">
      <div className=" col-span-6 md:col-span-2 p-4 border rounded-md">
        <h1 className="text-2xl font-semibold text-customPurple">
          Recent Chats
        </h1>
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
