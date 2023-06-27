import React from "react";
import logo from "../images/logo.png";

const Logo = () => {
  return (
    <div className="h-full w-[100px] ms-5 flex items-center">
      <img src={logo} alt="logo" className="w-full rounded-full" />
    </div>
  );
};

export default Logo;
