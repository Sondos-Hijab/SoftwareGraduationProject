import React, { useEffect, useState } from "react";
import Chat from "@/helper-components/Messages/Chat";
import InputMessage from "@/helper-components/Messages/InputMessage";
import { useParams } from "react-router-dom";
import { fetchMessages } from "@/apis/chatRequests";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import { createBlobUrl } from "@/utils/utils";

const Chatting = () => {
  const { username } = useParams();
  const [userProfilePicture, setUserProfilePicture] = useState(
    placeholderUserPicture
  );
  const [chatMessages, setChatMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [chatImage, setChatImage] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setChatImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setChatImage(null);
  };

  useEffect(() => {
    fetchMessages(username).then((value) => {
      setChatMessages(value.chatMessages);
      setUserProfilePicture(createBlobUrl(value.userProfilePicture.data));
    });
  }, [username]);

  return (
    <>
      {/* top section */}
      <div className="flex gap-4 border-b-2 py-2">
        <img
          src={userProfilePicture}
          alt="user picture"
          className="size-10 md:size-12 object-cover rounded-full"
        />

        <p className="text-lg text-customGreen font-semibold flex content-center flex-wrap">
          {username}
        </p>
      </div>
      {/* chat section */}
      <Chat
        chatMessages={chatMessages}
        userPicture={userProfilePicture}
        imagePreview={imagePreview}
        handleDeleteImage={handleDeleteImage}
        setChatMessages={setChatMessages}
        username={username}
      />
      {/* input bar */}
      <InputMessage
        username={username}
        handleImageChange={handleImageChange}
        chatImage={chatImage}
        imagePreview={imagePreview}
        handleDeleteImage={handleDeleteImage}
      />
    </>
  );
};

export default Chatting;
