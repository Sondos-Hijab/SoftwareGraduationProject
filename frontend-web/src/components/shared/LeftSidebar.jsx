import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { leftSidebarLinks } from "@/constants";
import { leftSidebarStyles } from "./LeftSidebarStyleClasses";
import { smallScreenLeftSidebar } from "./SmallScreenLeftSidebar";
import { appContext as AppContext } from "@/store/app-context";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logout } from "@/apis/authRequests";
import { useNotificationsContext } from "@/Providers/NotificationsProvider";
import { useMessagesContext } from "@/Providers/MessagesProvider";

const LeftSidebar = ({ showNavbar, setShowNavbar }) => {
  const useAppContext = () => useContext(AppContext);
  const { profileImage, businessName, accessToken } = useAppContext();

  const navigate = useNavigate();
  const { notificationsCount } = useNotificationsContext();
  const { totalMessagesCount } = useMessagesContext();
  //handling logout
  function handleLogout() {
    logout(accessToken).then((value) => {
      if (value.error) {
        console.log(value.error);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("businessName");
        localStorage.removeItem("expireDate");
        navigate("/auth/sign-in");
      }
    });
  }

  return (
    <>
      <nav
        className={
          showNavbar
            ? smallScreenLeftSidebar.navStyle
            : leftSidebarStyles.navStyle
        }
      >
        <div className={leftSidebarStyles.linksContainer}>
          <Link to="/" className={leftSidebarStyles.profileAndLogoLinkStyle}>
            <img src={logo} alt="logo" width={170} height={36} />
          </Link>
          <Link
            to="/profile"
            className={
              showNavbar
                ? smallScreenLeftSidebar.profileLinkStyle
                : leftSidebarStyles.profileAndLogoLinkStyle
            }
          >
            <img
              src={profileImage}
              alt="profile"
              className={leftSidebarStyles.profilePictureStyle}
            />
            <div className={leftSidebarStyles.businessInfoStyle}>
              <p className={leftSidebarStyles.businessNameStyle}>
                {businessName}
              </p>
            </div>
          </Link>

          {leftSidebarLinks.map((element) => {
            return (
              <Link
                key={element.label}
                to={element.route}
                className={
                  showNavbar
                    ? smallScreenLeftSidebar.linkStyle
                    : leftSidebarStyles.linkStyle
                }
              >
                <FontAwesomeIcon
                  className={leftSidebarStyles.iconStyle}
                  icon={element.icon}
                />
                {element.label === "Notifications" ? (
                  <div className="inline-flex justify-between items-center flex-1">
                    <span>{element.label} </span>
                    {notificationsCount > 0 && (
                      <span className=" bg-red-500 w-6 h-6 rounded-full text-white text-xs flex justify-center items-center">
                        {notificationsCount}
                      </span>
                    )}
                  </div>
                ) : element.label === "Messages" ? (
                  <div className="inline-flex justify-between items-center flex-1">
                    <span>{element.label} </span>
                    {totalMessagesCount > 0 && (
                      <span className=" bg-red-500 w-6 h-6 rounded-full text-white text-xs flex justify-center items-center">
                        {totalMessagesCount}
                      </span>
                    )}
                  </div>
                ) : (
                  element.label
                )}
              </Link>
            );
          })}

          <a
            className={
              showNavbar
                ? smallScreenLeftSidebar.linkStyle
                : leftSidebarStyles.linkStyle
            }
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              className={leftSidebarStyles.iconStyle}
              icon={faRightFromBracket}
            />
            Logout
          </a>
        </div>
      </nav>
      <div
        className={
          showNavbar
            ? smallScreenLeftSidebar.overlay
            : leftSidebarStyles.overlay
        }
        onClick={() => {
          setShowNavbar(!showNavbar);
        }}
      ></div>
    </>
  );
};

export default LeftSidebar;
