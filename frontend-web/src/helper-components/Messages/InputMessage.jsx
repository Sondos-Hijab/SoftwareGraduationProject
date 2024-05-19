import { addChatMessage, fetchMessages } from "@/apis/chatRequests";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const InputMessage = ({
  username,
  handleImageChange,
  chatImage,
  handleDeleteImage,
  setChatMessages,
}) => {
  const SOCKET_URL = "http://localhost:3000";

  const socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log(`Connected with socket ID: ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  const [textMessage, setTextMessage] = useState();

  const handleSendingMessage = () => {
    const messageInfo = new FormData();
    messageInfo.append("userName", username);
    messageInfo.append("businessName", localStorage.getItem("businessName"));
    messageInfo.append("sender", "1");
    messageInfo.append("text", textMessage);

    // Check if chatImage is not null before appending it
    if (chatImage) {
      messageInfo.append("photo", chatImage); // Assuming chatImage is the file itself
    }

    addChatMessage(messageInfo)
      .then((value) => {
        if (value.message) {
          setTextMessage("");
          handleDeleteImage();
          fetchMessages(username).then((value) => {
            console.log(value);
          });
        } else {
          console.log(value.error);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("newChatMessage", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("newChatMessage");
    };
  }, []);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 bg-white">
        <div className="flex items-center">
          <input
            className="w-10/12 py-3 border border-gray-200 px-4"
            type="text"
            placeholder="Type your message here"
            value={textMessage}
            onChange={(e) => {
              setTextMessage(e.target.value);
            }}
          />
          <label htmlFor="image-upload" className="w-1/12 cursor-pointer">
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="flex items-center justify-center bg-customYellow py-4">
              <FontAwesomeIcon className="text-white" icon={faImage} />
            </div>
          </label>
          <div
            className="flex items-center justify-center bg-customGreen w-1/12 py-4 cursor-pointer"
            onClick={handleSendingMessage}
          >
            <FontAwesomeIcon className="text-white" icon={faPaperPlane} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputMessage;
