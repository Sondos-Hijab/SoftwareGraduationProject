import { createBlobUrl, getFormattedDateAndTime } from "@/utils/utils";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";

const Chat = ({
  chatMessages,
  userPicture,
  imagePreview,
  handleDeleteImage,
}) => {
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when chatMessages change
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages, imagePreview]);

  return (
    <div
      ref={chatRef}
      className="flex flex-col gap-8 mt-4 h-[70vh] overflow-auto  justify-between"
    >
      <div className="flex flex-col gap-8">
        {chatMessages.map((message) => {
          return (
            <div
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

                  {message?.photo && (
                    <img
                      src={createBlobUrl(message?.photo.data)}
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
