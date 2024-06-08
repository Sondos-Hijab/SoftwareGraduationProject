import { fetchFeedback } from "@/apis/feedbackRequests";
import NotificationCard from "@/helper-components/Cards/NotificationCard";
import { sortByDate } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Notifications = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback().then((value) => {
      if (value?.error) {
        console.log("error fetching notifications");
      } else {
        setFeedback(value.feedback);
        console.log(value.feedback);
      }
    });
  }, []);

  const SOCKET_URL = "http://localhost:3000";

  const socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
      socket.emit("register", {
        businessName: localStorage.getItem("businessName"),
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("newFeedback", (newFeedback) => {
      console.log("new feedback", newFeedback);
      // setFeedback([...feedback, newFeedback]);
    });

    return () => {
      socket.off("newFeedback");
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 justify-center px-10 md:px-20 lg:px-32 py-12">
      <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
        Notifications
      </h2>

      <div className="mb-4 block rounded-lg p-4 shadow-md shadow-gray-200 ">
        {sortByDate(feedback, "newToOld").map((feed) => (
          <NotificationCard key={feed["feedbackID"]} feedback={feed} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
