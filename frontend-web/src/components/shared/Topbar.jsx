import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import profileImage from "../../assets/images/placeholder.png";
import logo from "../../assets/images/logo.png";

const TopBar = () => {
  return (
    <section className="sticky top-0 z-50 md:hidden w-full">
      <div className="flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" width={130} height={350} />
        </Link>
        <div className="flex gap-0">
          <Link className="flex justify-center items-center gap-3">
            <img src={profileImage} className="h-10 w-10 rounded-full " />
          </Link>

          <Button className="text-[#fac100]">
            <FontAwesomeIcon icon={faRightFromBracket} className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
