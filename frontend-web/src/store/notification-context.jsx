import { createContext } from "react";

export const notificationsContext = createContext({
  notifications: [],
  notificationsCount: 0,
});
