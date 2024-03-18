import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { leftSidebarLinks } from "@/constants";
import { leftSidebarStyles } from "./LeftSidebarStyleClasses";
import { smallScreenLeftSidebar } from "./SmallScreenLeftSidebar";
import { appContext as AppContext } from "@/store/app-context";

const LeftSidebar = ({ showNavbar, setShowNavbar }) => {
  const useAppContext = () => useContext(AppContext);
  const { profileImage, businessName } = useAppContext();

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

          {leftSidebarLinks.map((element) => (
            <Link
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
              {element.label}
            </Link>
          ))}
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
