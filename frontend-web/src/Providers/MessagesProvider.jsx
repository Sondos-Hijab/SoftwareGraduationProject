import { useState, useContext } from "react";
import { messagesContext as MessagesContext } from "@/store/messages-context";
import { fetchMessages, getBusinessChatPartners } from "@/apis/chatRequests";

const MessagesProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatPartners, setChatPartners] = useState([]);
  const [unseenMessagesCount, setUnseenMessagesCount] = useState([]);

  const loadChatPartners = () => {
    getBusinessChatPartners().then((value) => {
      setChatPartners([...value.chatPartners.data]);
    });
  };

  const loadChatMessages = (username) => {
    fetchMessages(username).then((value) => {
      setChatMessages(value.chatMessages);
    });
  };

  const addChatToChatMessages = (chatMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
  };

  const increaseUnseenMessagesCount = (username) => {
    setUnseenMessagesCount((prev) => [...prev, { username: prev[username]++ }]);
  };

  const resetUnseenMessagesCount = (username) => {
    setUnseenMessagesCount((prev) => [...prev, { username: 0 }]);
  };

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
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

export const useMessagesContext = () => useContext(MessagesContext);
