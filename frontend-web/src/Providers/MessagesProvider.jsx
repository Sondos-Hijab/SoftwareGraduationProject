import { useState, useContext, useEffect } from "react";
import { messagesContext as MessagesContext } from "@/store/messages-context";
import { fetchMessages, getBusinessChatPartners } from "@/apis/chatRequests";
import { socket } from "@/constants";
import { createBlobUrl } from "@/utils/utils";
import placeholderUserPicture from "@/assets/images/placeholder.png";

const MessagesProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatPartners, setChatPartners] = useState([]);
  const [userProfilePicture, setUserProfilePicture] = useState(
    placeholderUserPicture
  );
  const [totalMessagesCount, setTotalMessagesCount] = useState(0);

  const [unseenMessagesCount, setUnseenMessagesCount] = useState(new Map());
  const [flag, setFlag] = useState(true);
  const [user, setUser] = useState("");

  const loadChatPartners = () => {
    getBusinessChatPartners().then((value) => {
      setChatPartners([...value.chatPartners.data]);
    });
  };

  const loadChatMessages = (username) => {
    fetchMessages(username).then((value) => {
      setChatMessages(value.chatMessages);
      setUserProfilePicture(createBlobUrl(value.userProfilePicture.data));
    });
  };

  const addChatToChatMessages = (chatMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
    if (chatMessage.sender == "0") {
      setFlag(true);
      setUser(chatMessage.userName);
    }
  };
  const increaseUnseenMessagesCount = (username) => {
    const currentCount = unseenMessagesCount.get(username.toString());
    if (currentCount === undefined) {
      setUnseenMessagesCount((prevCount) =>
        prevCount.set(username.toString(), 1)
      );
    } else {
      setUnseenMessagesCount((prevCount) =>
        prevCount.set(username.toString(), currentCount + 1)
      );
    }
  };

  const resetUnseenMessagesCount = (username) => {
    let previousCount = unseenMessagesCount.get(username);
    setUnseenMessagesCount((prev) => {
      return prev.set(username.toString(), 0);
    });
    setTotalMessagesCount((prev) => {
      if (prev - previousCount >= 0) return prev - previousCount;
      else return 0;
    });
  };
  useEffect(() => {
    socket.on("newChatMessage", (newMessage) => {
      addChatToChatMessages(newMessage);
    });

    return () => {
      socket.off("newChatMessage");
    };
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        chatMessages,
        loadChatMessages,
        chatPartners,
        loadChatPartners,
        unseenMessagesCount,
        addChatToChatMessages,
        increaseUnseenMessagesCount,
        resetUnseenMessagesCount,
        setTotalMessagesCount,
        userProfilePicture,
        totalMessagesCount,
        flag,
        setFlag,
        user,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

export const useMessagesContext = () => useContext(MessagesContext);
