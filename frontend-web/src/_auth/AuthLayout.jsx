import { Outlet } from "react-router-dom";
import onBoarding from "../assets/images/onboarding.png";

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[100vw] lg:w-[50vw] flex justify-center items-center">
        <Outlet />
      </div>
      <div className="hidden lg:block w-[50vw]">
        <img src={onBoarding} className="h-screen" />
      </div>
    </div>
  );
};

export default AuthLayout;
