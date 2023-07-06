import React from "react";
import Logo from "../components/Logo";
import { BsFillPersonFill } from "react-icons/bs";
import {Link} from "react-router-dom";

const Navbar = ({enableManu}) => {
  return (
    <nav className="bg-green-800 h-[120px] flex justify-between items-center font-[DM_Sans] sticky top-0 z-10">
      <Link to={'/'}>
        <div className="flex items-center h-full">
          <Logo/>
          <div className="ms-5 flex flex-col md:items-center">
            <div className="text-slate-300 text-3xl font-bold">
              Cuochi a domicilio
            </div>
            <div className="text-slate-300 text-base">
              Il ristorante a casa tua
            </div>
          </div>
        </div>
      </Link>
      {enableManu && <div className="me-20 text-slate-300 text-xl font-semibold flex items-center">
        <BsFillPersonFill size={30} />
        <Link to={"/login"} className="ms-1 me-6">
          Login
        </Link>
        <Link to={"/userRegistration"}>Registrati</Link>
      </div>}
    </nav>
  );
};

export default Navbar;
