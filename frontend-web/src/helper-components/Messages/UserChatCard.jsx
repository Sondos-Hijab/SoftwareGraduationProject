import React from "react";

const UserChatCard = () => {
  return (
    <div className="flex items-start gap-4 p-4 border-b-2">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        className="size-10 md:size-16 rounded-full object-cover"
      />

      <div className="flex flex-col justify-between ">
        <h3 className="font-medium text-sm sm:text-lg text-customGreen">
          Username
        </h3>

        <p className="line-clamp-2 text-sm text-gray-950">Last message sent</p>

        <p className="line-clamp-2  text-sm text-gray-500">
          {new Date().toUTCString()}
        </p>
      </div>
    </div>
  );
};

export default UserChatCard;
