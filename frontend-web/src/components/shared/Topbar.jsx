import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import placeHolderprofileImage from "../../assets/images/placeholder.png";
import logo from "../../assets/images/logo.png";
import { useAppContext } from "@/Providers/AppPovider";

const TopBar = ({ showNavbar, setShowNavbar }) => {
  const { profileImage } = useAppContext();
  return (
    <section className="sticky top-0 z-40 md:hidden w-full bg-slate-100">
      <div className="flex justify-between items-center py-4 px-5">
        <Button
          className="text-slate-600"
          onClick={() => {
            setShowNavbar(!showNavbar);
          }}
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" width={130} height={350} />
        </Link>
        <div className="flex gap-0">
          <Link
            className="flex justify-center items-center gap-3"
            to="/profile"
          >
            <img
              src={profileImage || placeHolderprofileImage}
              className="h-10 w-10 rounded-full "
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
