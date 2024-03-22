import React from "react";

const Chat = () => {
  const imgSource =
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60";
  const recentChats = [
    {
      sender: "You",
      msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      sender: "User",
      msg: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    },
    {
      sender: "You",
      msg: "to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      sender: "User",
      msg: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
      sender: "You",
      msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      sender: "User",
      msg: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    },
    {
      sender: "You",
      msg: "to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      sender: "User",
      msg: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  ];
  return (
    <div className="flex flex-col gap-8 mt-4 h-[70vh] overflow-auto">
      {recentChats.map((message) => {
        return (
          <div
            className={`flex gap-4 ${
              message.sender == "You" ? "flex-row-reverse " : "flex-row"
            }`}
          >
            <img
              src={imgSource}
              className={`size-10 rounded-full inline-block`}
            />
            <p
              className={`p-4 w-3/4  rounded-xl ${
                message.sender == "You"
                  ? "bg-customBlue text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {message.msg}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
