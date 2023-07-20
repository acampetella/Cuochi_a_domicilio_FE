import React from "react";
import Logo from "../components/Logo";
import { BsFillPersonFill } from "react-icons/bs";
import {Link} from "react-router-dom";
import { isAuth } from "../utilities/token/session";
import { useState, useEffect } from "react";
import getDecodeSession from "../utilities/token/decodeSession";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setInitialUser, setUserChange } from "../reducers/userReducer";
import {setCook, setInitialCook, setCookChange} from "../reducers/cookReducer";
import { setCookMenuCourses } from "../reducers/cookMenuReducer";
import HamburgerMenu from "./HamburgerMenu";
import "../styles/navbarStyle.css";

const Navbar = () => {

  const [enableManu, setEnableMenu] = useState(false);
  const [enableUserMenu, setEnableUserMenu] = useState(false);
  const [enableCookMenu, setEnableCookMenu] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileURL, setProfileURL] = useState(null);
  const [hamburgerMenusList, setHamburgerMenusList] = useState([]);
  const [hamburgerLinksList, setHamburgerLinksList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    resetUserParameters();
    resetCookParameters();
    setEnableMenu(true);
    navigate("/", { replace: true });
  };

  const resetUserParameters = () => {
    dispatch(setUser(null));
    dispatch(setInitialUser(null));
    dispatch(setUserChange(false));
  };

  const resetCookParameters = () => {
    dispatch(setCook(null));
    dispatch(setInitialCook(null));
    dispatch(setCookChange(false));
    dispatch(setCookMenuCourses([]));
  };

  useEffect(() => {
    if (!isAuth()) {
      setEnableMenu(true);
    } else {
      setEnableMenu(false);
      const session = getDecodeSession();
      setUserId(`${session.firstName.toUpperCase().charAt(0)}${session.lastName.toUpperCase().charAt(0)}`);
      if (session.role === 'user') {
        setProfileURL("/userProfile");
        setEnableUserMenu(true);
        setHamburgerMenusList(['Profilo', 'Richieste']);
        setHamburgerLinksList(['/userProfile', '/userRequestsManager']);
      } else if (session.role === 'cook') {
        setProfileURL("/cookProfile");
        setEnableCookMenu(true);
        setHamburgerMenusList(['Profilo','Info', 'Menu', 'Richieste']);
        setHamburgerLinksList(['/cookProfile', '/cookInfo', '/cookMenus', '/cookRequestsManager']);
      } else {
        setProfileURL("/adminProfile");
        setHamburgerMenusList(['Profilo']);
        setHamburgerLinksList(['/adminProfile']);
      }
    }
  }, []);

  return (
    <nav className="bg-green-800 h-[120px] flex justify-between items-center font-[DM_Sans] sticky top-0 z-20">
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
      {enableUserMenu && 
       <div className="hidden me-20 text-slate-300 text-xl font-semibold sm:flex items-center">
       <Link to={"/userRequestsManager"} className="ms-1 me-6">
         Richieste
       </Link>
     </div>}
      {enableCookMenu && 
      <div className="hidden me-20 text-slate-300 text-xl font-semibold sm:flex items-center">
        <Link to={"/cookInfo"} className="ms-1 me-6">
          Info
        </Link>
        <Link to={"/cookMenus"} className="me-6">Menu</Link>
        <Link to={"/cookRequestsManager"}>Richieste</Link>
      </div>}
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
        <Link to={profileURL} className="sm:inline hidden">
          <div className="w-[50px] h-[50px] rounded-full bg-lime-700 border-2 border-white flex justify-center items-center mr-1">
            {userId}
          </div>
        </Link>
        <a href="#" className="ml-3 me-6">
          <button onClick={logout}>Logout</button>
        </a>
        <div className="hamburger-menu">
          <HamburgerMenu 
            menusList={hamburgerMenusList} 
            linksList={hamburgerLinksList}
          />
        </div>
      </div>}
    </nav>
  );
};

export default Navbar;
