import LeftSidebar from "@/components/shared/LeftSidebar";
import TopBar from "@/components/shared/Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/Providers/AppPovider";
import { fetchImage, fetchInfo } from "@/apis/profileAndBusinessInfo";

const RootLayout = () => {
  const { handleBusinessNameChange, setFetchedImage, accessToken } =
    useAppContext();

  const [showNavbar, setShowNavbar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function isExpired(dateToCheck) {
      const currentDate = new Date();
      return currentDate > dateToCheck;
    }
    if (
      !localStorage.getItem("accessToken") ||
      !localStorage.getItem("expireDate") ||
      isExpired(localStorage.getItem("expireDate"))
    )
      navigate("/auth/sign-in");
    else console.log("not expired");

    fetchImage(accessToken).then((value) => {
      setFetchedImage(`data:image/*;base64,${value}`);
    });

    fetchInfo(accessToken).then((businessInfo) => {
      handleBusinessNameChange(businessInfo["name"]);
      localStorage.setItem("businessName", businessInfo["name"]);
    });
  }, []);

  return (
    <div className="w-full md:flex">
      <TopBar setShowNavbar={setShowNavbar} showNavbar={showNavbar} />
      <LeftSidebar setShowNavbar={setShowNavbar} showNavbar={showNavbar} />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
