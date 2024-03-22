import UserChatSearch from "@/helper-components/Messages/UserChatSearch";
import React from "react";
import UsersChats from "@/helper-components/Messages/UsersChats";
import Chat from "@/helper-components/Messages/Chat";
import InputMessage from "@/helper-components/Messages/InputMessage";

const Chatting = () => {
  return (
    <div className="grid grid-cols-6 gap-4 p-6 shadow-sm">
      <div className=" col-span-6 md:col-span-2 p-4 border rounded-md  ">
        <h1 className="text-2xl font-semibold text-customPurple">
          Recent Chats
        </h1>
        {/* search */}
        <UserChatSearch />

        {/* Users Chats */}
        <UsersChats />
      </div>
      <div className=" col-span-4 hidden md:block px-4 pt-4 border rounded-md">
        {/* top section */}
        <div className="flex gap-4 border-b-2 py-2">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            className="size-10 md:size-16 object-cover rounded-full"
          />
          <p className="text-lg text-customGreen font-semibold flex content-center flex-wrap">
            Username
          </p>
        </div>
        {/* chat section */}
        <Chat />

        {/* input bar */}
        <InputMessage />
      </div>
    </div>
  );
};

export default Chatting;
