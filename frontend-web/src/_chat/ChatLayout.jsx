import React, { useEffect, useState } from "react";
import UsersChats from "@/helper-components/Messages/UsersChats";
import { Link, Outlet } from "react-router-dom";
import { getBusinessChatPartners } from "@/apis/chatRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHouse,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

const ChatLayout = () => {
  const [chatPartners, setChatPartners] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hideRecentChats, setHideRecentChats] = useState(false);

  useEffect(() => {
    refreshChatPartners();
    // Add event listener for screen size
    window.addEventListener("resize", handleResize);
    // Check initial screen size
    handleResize();
    console.log(isMobile);
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const refreshChatPartners = () => {
    getBusinessChatPartners().then((value) => {
      setChatPartners([...value.chatPartners.data]);
    });
  };

  const chatClicked = () => {
    setHideRecentChats(true);
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-6 shadow-sm h-screen">
      <div className=" col-span-6 md:col-span-2 p-4 border rounded-md">
        <div className="flex justify-between items-center">
          {/* Icon for refresh */}
          {!hideRecentChats ? (
            <Link to="/" className="cursor-pointer text-customYellow">
              <FontAwesomeIcon icon={faHouse} size="lg" />
            </Link>
          ) : (
            <Link
              to="/chatting"
              className="cursor-pointer text-customYellow"
              onClick={() => {
                setHideRecentChats(false);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </Link>
          )}

          {!hideRecentChats && (
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-customPurple">
                Recent Chats
              </h1>
            </div>
          )}

          {/* Icon for refresh */}
          {!hideRecentChats && (
            <div
              onClick={refreshChatPartners}
              className="cursor-pointer text-customYellow"
            >
              <FontAwesomeIcon icon={faSyncAlt} size="lg" />
            </div>
          )}
        </div>

        {/* search */}
        {/* <UserChatSearch /> */}

        {/* Users Chats */}
        {!(hideRecentChats && isMobile) && chatPartners.length > 0 && (
          <UsersChats
            chatPartners={chatPartners}
            isMobile={isMobile}
            chatClicked={chatClicked}
          />
        )}

        {isMobile && <Outlet />}
      </div>
      {!isMobile && (
        <div className=" col-span-4 hidden md:block px-4 pt-4 border rounded-md relative">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
