import { createContext } from "react";

export const notificationsContext = createContext({
  notifications: [],
  notificationsCount: Number(localStorage.getItem("notificationsCount")) || 0,
});
