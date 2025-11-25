import React from "react";
import Logo from "../Components/Logo/Logo";
import authImg from "../assets/authimage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="">
      {/* Container with max width and horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo - centered with padding */}
        <div className="py-8 sm:py-10 flex ">
          <Logo></Logo>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Auth Forms (Login, Register, etc.) */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Outlet></Outlet>
            </div>
          </div>

          {/* Right Side: Auth Image */}
          <div className="hidden lg:flex justify-center lg:justify-start">
            <img
              src={authImg}
              alt="Authentication illustration"
              className="w-full max-w-lg object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Optional: Show image below form on mobile */}
        <div className="mt-12 lg:hidden flex justify-center">
          <img
            src={authImg}
            alt="Authentication illustration"
            className="w-full max-w-sm object-contain opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;