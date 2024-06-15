import NotificationCard from "@/helper-components/Cards/NotificationCard";
import { sortByDate } from "@/utils/utils";
import React, { useEffect } from "react";
import { useNotificationsContext } from "@/Providers/NotificationsProvider";

const Notifications = () => {
  const { notifications, getNotifications } = useNotificationsContext();

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="flex flex-col flex-1 justify-center px-10 md:px-20 lg:px-32 py-12">
      <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
        Notifications
      </h2>

      <div className="mb-4 block rounded-lg p-4 shadow-md shadow-gray-200 ">
        {sortByDate(notifications, "newToOld").map((feed) => (
          <NotificationCard key={feed["feedbackID"]} feedback={feed} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
