import React from "react";
import logo from "../images/logo.png";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="bg-green-800 h-[120px] flex justify-between items-center">
      <a href="#">
        <div className="flex items-center h-full">
          <div className="h-full w-[100px] ms-5 flex items-center">
            <img src={logo} alt="logo" className="w-full rounded-full" />
          </div>
          <div className="ms-5 flex flex-col items-center font-serif">
            <div className="text-slate-300 text-3xl font-bold">
              Cuochi a domicilio
            </div>
            <div className="text-slate-300 text-base">
              Il ristorante a casa tua
            </div>
          </div>
        </div>
      </a>
      <div className="me-20 text-slate-300 text-xl font-semibold flex items-center">
        <BsFillPersonFill size={30} />
        <a href="#" className="ms-1 me-6">
          Login
        </a>
        <a href="#">Registrati</a>
      </div>
    </nav>
  );
};

export default Navbar;
