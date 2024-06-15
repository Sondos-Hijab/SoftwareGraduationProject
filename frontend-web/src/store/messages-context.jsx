import { createContext } from "react";

export const messagesContext = createContext({
  chatPartners: [],
  chatMessages: [],
  unseenMessagesCount: new Map(),
  totalMessagesCount: 0,
});
