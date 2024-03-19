import LeftSidebar from "@/components/shared/LeftSidebar";
import TopBar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/Providers/AppPovider";
import { fetchImage, fetchInfo } from "@/apis/profileAndBusinessInfo";

const RootLayout = () => {
  const { handleBusinessNameChange, setFetchedImage , accessToken} = useAppContext();

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    fetchImage(accessToken).then((value) => {
      setFetchedImage(`data:image/*;base64,${value}`);
    });

    fetchInfo(accessToken).then((businessInfo) => {
      handleBusinessNameChange(businessInfo["name"]);
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
