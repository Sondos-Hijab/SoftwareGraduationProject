import { useState, useContext, useEffect } from "react";
import { notificationsContext as NotificationsContext } from "@/store/notification-context";
import { fetchFeedback } from "@/apis/feedbackRequests";
import { socket } from "@/constants";
const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(
    Number(localStorage.getItem("notificationsCount")) || 0
  );

  const getNotifications = () => {
    fetchFeedback().then((value) => {
      if (value?.error) {
        console.log("error fetching notifications");
      } else {
        setNotifications(value.feedback);
      }
    });
  };

  const increaseNotificationsCount = () => {
    setNotificationsCount((prevCount) => prevCount + 1);
  };
  const resetNotificationsCount = () => {
    setNotificationsCount(0);
  };
  const decreaseNotificationsCount = () => {
    setNotificationsCount((prevCount) => (prevCount == 0 ? 0 : prevCount - 1));
  };

  const addNotification = (newNotification) => {
    setNotifications((prev) => [...prev, newNotification]);
  };

  useEffect(() => {
    socket.on("newFeedback", (newFeedback) => {
      addNotification(newFeedback);
      increaseNotificationsCount();
    });
    return () => {
      socket.off("newFeedback");
    };
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        notificationsCount,
        getNotifications,
        addNotification,
        increaseNotificationsCount,
        decreaseNotificationsCount,
        resetNotificationsCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;

export const useNotificationsContext = () => useContext(NotificationsContext);
