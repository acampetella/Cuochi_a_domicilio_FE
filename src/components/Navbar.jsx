import React from "react";
import Logo from "../components/Logo";
import { BsFillPersonFill } from "react-icons/bs";
import {Link} from "react-router-dom";
import { isAuth } from "../utilities/token/session";
import { useState, useEffect } from "react";
import getDecodeSession from "../utilities/token/decodeSession";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [enableManu, setEnableMenu] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!isAuth()) {
      setEnableMenu(true);
    } else {
      setEnableMenu(false);
      const session = getDecodeSession();
      setUserId(`${session.firstName.toUpperCase().charAt(0)}${session.lastName.toUpperCase().charAt(0)}`);
    }
  }, []);

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
      {enableManu && 
      <div className="me-20 text-slate-300 text-xl font-semibold flex items-center">
        <BsFillPersonFill size={30} />
        <Link to={"/login"} className="ms-1 me-6">
          Login
        </Link>
        <Link to={"/userRegistration"}>Registrati</Link>
      </div>}
      {!enableManu && 
      <div className="me-20 text-slate-300 text-xl font-semibold flex items-center">
        <div className="w-[50px] h-[50px] rounded-full bg-lime-700 border-2 border-white flex justify-center items-center mr-1">
          {userId}
        </div>
        <a href="#" className="ml-3 me-6">
          <button onClick={logout}>Logout</button>
        </a>
      </div>}
    </nav>
  );
};

export default Navbar;
