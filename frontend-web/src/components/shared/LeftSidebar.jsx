import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import profileImage from "../../assets/images/placeholder.png";

import {
  faBell,
  faComments,
  faHouse,
  faImage,
  faRightFromBracket,
  faTableColumns,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeftSidebar = () => {
  const linkStyle =
    "text-lg font-semibold tracking-wide text-slate-600 rounded-lg hover:bg-white hover:text-[#13b6f5] py-3 px-3";

  return (
    <nav className="sticky top-0 hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-slate-100 h-screen">
      <div className="flex flex-col gap-5 ">
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" width={170} height={36} />
        </Link>
        <Link className="flex gap-3 items-center">
          <img
            src={profileImage}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-[18px] font-bold leading-[140%] text-[#0db783]">
              {"Sondos Hijab"}
            </p>
            <p className="text-[14px] font-normal leading-[140%] text-light-3">
              {"Sondos.hijab@gmail.com"}
            </p>
          </div>
        </Link>
        <Link className={linkStyle}>
          <FontAwesomeIcon className="text-[#13b6f5] mr-3" icon={faHouse} />
          Home
        </Link>
        <Link className={linkStyle}>
          <FontAwesomeIcon
            className="text-[#13b6f5] mr-3"
            icon={faTableColumns}
          />
          Dashboard
        </Link>
        <Link className={linkStyle}>
          <FontAwesomeIcon className="text-[#13b6f5] mr-3" icon={faImage} />
          My posts
        </Link>
        <Link className={linkStyle}>
          <FontAwesomeIcon className="text-[#13b6f5] mr-3" icon={faUpload} />{" "}
          Add a post
        </Link>
        <Link className={linkStyle}>
          <FontAwesomeIcon className="text-[#13b6f5] mr-3" icon={faComments} />
          Messages
        </Link>
        <Link className={linkStyle}>
          <FontAwesomeIcon className="text-[#13b6f5] mr-3" icon={faBell} />
          Notifications
        </Link>

        <Link className={linkStyle}>
          <FontAwesomeIcon
            className="text-[#13b6f5] mr-3"
            icon={faRightFromBracket}
          />
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
