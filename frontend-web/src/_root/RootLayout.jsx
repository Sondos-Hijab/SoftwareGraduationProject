import LeftSidebar from "@/components/shared/LeftSidebar";
import TopBar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";

const RootLayout = () => {
  const [showNavbar, setShowNavbar] = useState(false);
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
