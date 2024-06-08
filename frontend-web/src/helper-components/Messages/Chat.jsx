import { createBlobUrl, getFormattedDateAndTime } from "@/utils/utils";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

const Chat = ({
  chatMessages,
  userPicture,
  imagePreview,
  handleDeleteImage,
  setChatMessages,
  username,
}) => {
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when chatMessages change
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages, imagePreview]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
      socket.emit("register", {
        businessName: localStorage.getItem("businessName"),
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("receiveMessage", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("newChatMessage", (newMessage) => {
      if (newMessage.userName === username)
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("newChatMessage");
    };
  }, [username]);
  return (
    <div
      ref={chatRef}
      className="flex flex-col gap-8 mt-4 h-[70vh] overflow-auto  justify-between"
    >
      <div className="flex flex-col gap-8">
        {chatMessages.map((message) => {
          return (
            <div
              key={message.chatID}
              className={`flex gap-4 ${
                message.sender == 1 ? "flex-row-reverse " : "flex-row"
              }`}
            >
              <img
                src={
                  message.sender == 1
                    ? localStorage.getItem("businessProfilePicture")
                    : userPicture
                }
                className={`size-8 rounded-full inline-block`}
              />
              <div
                className="relative"
                title={getFormattedDateAndTime(message["created_at"])}
              >
                <div
                  className={`p-4 rounded-xl ${
                    message.sender == 1
                      ? "bg-customBlue text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {message.text !== "undefined" && <p>{message.text}</p>}

                  {message?.photo && message?.photo?.data && (
                    <img
                      src={createBlobUrl(message?.photo.data)}
                      alt="picture message"
                      className="w-[200px] h-auto"
                    />
                  )}
                  {message?.photo && !message?.photo?.data && (
                    <img
                      src={createBlobUrl(message?.photo)}
                      alt="picture message"
                      className="w-[200px] h-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {imagePreview && (
        <div className="flex justify-center mt-2">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-[200px] h-auto"
          />
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-customRed ml-2 cursor-pointer"
            onClick={handleDeleteImage}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
