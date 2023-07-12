import React from "react";
import "../styles/cookInfoStyle.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {cook, initialCook, cookChange } from "../reducers/cookReducer";
import { setCook, setInitialCook, setCookChange } from '../reducers/cookReducer';
import getDecodeSession from "../utilities/token/decodeSession";
import { Toast } from "../utilities/notifications/toast";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { LuEdit } from "react-icons/lu";
import { CgAddR } from "react-icons/cg";
import { RiDeleteBin5Line } from "react-icons/ri";
import CookDescriptionModal from "../components/CookDescriptionModal";
import AddCookTownModal from "../components/AddCookTownModal";
import { cookTownModalShow, setCookTownModalShow } from "../reducers/cookTownModalReducer";
import { cookDescriptionModalShow, setCookDescriptionModalShow } from "../reducers/cookDescriptionModalReducer";
import { cookLinkModalShow, setCookLinkModalShow } from "../reducers/cookLinkModalReducer";
import AddCookLinkModal from "../components/AddCookLinkModal";
import { checkCookChange } from "../utilities/validations/cookChangeValidation";
import getAccessKey from "../utilities/token/accessKey";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import {BiCollapseHorizontal, BiCollapseVertical} from "react-icons/bi";

const CookInfo = () => {

  const dispatch = useDispatch();
  const [online, setOnline] = useState(false);
  const currentCook = useSelector(cook);
  const oldCook = useSelector(initialCook);
  const session = getDecodeSession();
  const showDescriptionModal = useSelector(cookDescriptionModalShow);
  const showTownModal = useSelector(cookTownModalShow);
  const showLinkModal = useSelector(cookLinkModalShow);
  const change = useSelector(cookChange);
  const token = getAccessKey();
  const [isLoading, setIsLoading] = useState(false);
  const [descrCollapse, setDescrCollaps] = useState(false);
  const [townsCollapse, setTownsCollaps] = useState(false);
  const [linksCollapse, setLinksCollaps] = useState(false);

  const toggleOnline = () => {
    setOnline(!online);
  };

  const toggleDescrCollapse = () => {
    setDescrCollaps(!descrCollapse);
  }

  const toggleTownsCollapse = () => {
    setTownsCollaps(!townsCollapse);
  }

  const toggleLinksCollapse = () => {
    setLinksCollaps(!linksCollapse);
  }

  const getCook = async () => {
    const userId = session.id;
    let myToast;
    setIsLoading(true);
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cooks/byUserId/${userId}`);
      const response = await data.json();
      if (response.statusCode === 200) {
        const newCook = response.cookExists;
        return newCook;
      } else {
        const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
        myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };

  const editDescriptionHandler = () => {
    dispatch(setCookDescriptionModalShow(true));
  };

  const addTownHandler = () => {
    dispatch(setCookTownModalShow(true));
  };

  const addLinkHandler = () => {
    dispatch(setCookLinkModalShow(true));
  };

  const deleteTownHandler = (index) => {
    const arr = [...currentCook.towns];
    arr.splice(index, 1);
    const newCook = { ...currentCook, towns: arr };
    dispatch(setCook(newCook));
  };

  const deleteLinkHandler = (index) => {
    const arr = [...currentCook.personalLinks];
    arr.splice(index, 1);
    const newCook = { ...currentCook, personalLinks: arr };
    dispatch(setCook(newCook));
  };

  const saveFunction = async () => {
    
    setIsLoading(true);
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cooks/${currentCook._id}`, {
        method: "PATCH",
        body: JSON.stringify(currentCook),
        headers: {
          Auth: token,
          "Content-Type": "application/json",
        }
      });
      const response = await data.json();
      if (response.statusCode === 200) {
        setIsLoading(false);
        dispatch(setInitialCook(currentCook));
        dispatch(setCookChange(false));
        const myToast = new Toast("Operation performed successfully");
        myToast.notifyMessage();
      } else {
        setIsLoading(false);
        const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
        const myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
    } catch (error) {
      setIsLoading(false);
      const myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };

  useEffect(() => {
    if (!currentCook) {
      getCook().then((newCook) => {
      dispatch(setCook(newCook));
      dispatch(setInitialCook(newCook));
      });
    }
    if (currentCook && oldCook) {
      const check = checkCookChange(currentCook, oldCook);
      dispatch(setCookChange(check));
    }
  }, [dispatch, currentCook]);

  useEffect(() => {
    const newCook = {...currentCook, available: online};
    dispatch(setCook(newCook));
  }, [online]);

  useEffect(() => {
    if (descrCollapse) {
      setTownsCollaps(false);
      setLinksCollaps(false);
    }
  }, [descrCollapse]);

  useEffect(() => {
    if (townsCollapse) {
      setDescrCollaps(false);
      setLinksCollaps(false);
    }
  }, [townsCollapse]);

  useEffect(() => {
    if (linksCollapse) {
      setDescrCollaps(false);
      setTownsCollaps(false);
    }
  }, [linksCollapse]);
  
  return (
    <div>
      <Navbar />
      {showDescriptionModal && <CookDescriptionModal/>}
      {showTownModal && <AddCookTownModal/>}
      {showLinkModal && <AddCookLinkModal/>}
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      <div className="flex flex-col justify-center items-center h-[100vh] bg-slate-100">
        <div className="relative flex flex-col items-center rounded-[20px] sm:w-4/5 w-full xl:h-4/5 h-full mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Una tua breve descrizione
            </h4>
            <p className="hidden sm:block mt-2 px-2 text-base text-gray-600">
              {currentCook && <span>{currentCook.description}</span>}
              {currentCook && !currentCook.description && <span>Al momento non è presente alcuna descrizione</span>}
            </p>
            {descrCollapse && <p className="block mt-2 px-2 text-base text-gray-600">
              {currentCook && <span>{currentCook.description}</span>}
              {currentCook && !currentCook.description && <span>Al momento non è presente alcuna descrizione</span>}
            </p>}
            {descrCollapse && <div className="block mt-4 ml-2">
              <button onClick={editDescriptionHandler}><LuEdit className="md:text-3xl text-xl"/></button>
            </div>}
            <div className="hidden sm:block mt-4 ml-2">
              <button onClick={editDescriptionHandler}><LuEdit className="md:text-3xl text-xl"/></button>
            </div>
            {!descrCollapse && <div className="flex gap-2 mt-3 sm:hidden">
              <button onClick={toggleDescrCollapse}>
                <BiCollapseHorizontal className="text-2xl"/>
              </button>
            </div>}
            {descrCollapse && <div className="flex gap-2 mt-3">
              <button onClick={toggleDescrCollapse}>
                <BiCollapseVertical className="text-2xl"/>
              </button>
            </div>}
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col items-start sm:justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Città coperte</p>
              {!townsCollapse && <div className="flex gap-2 mt-2 sm:hidden">
                <button onClick={toggleTownsCollapse}>
                  <BiCollapseHorizontal className="text-2xl"/>
                </button>
              </div>}
              {townsCollapse && <div className="flex gap-2 mt-2">
                <button onClick={toggleTownsCollapse}>
                  <BiCollapseVertical className="text-2xl"/>
                </button>
              </div>}
              <div className="hidden sm:block text-base font-medium text-navy-700 dark:text-white">
                <ul>
                  {currentCook && currentCook.towns && currentCook.towns.map((town, index) => {
                    return <li key={nanoid()}>
                              {town}
                              <button 
                                className="ml-2"
                                onClick={() => deleteTownHandler(index)}
                              >
                                <RiDeleteBin5Line className="text-xl"/>
                              </button>
                            </li>
                  })}
                </ul>
              </div>
              {townsCollapse && <div className="block text-base font-medium text-navy-700 dark:text-white">
                <ul>
                  {currentCook && currentCook.towns && currentCook.towns.map((town, index) => {
                    return <li key={nanoid()}>
                              {town}
                              <button 
                                className="ml-2"
                                onClick={() => deleteTownHandler(index)}
                              >
                                <RiDeleteBin5Line className="text-xl"/>
                              </button>
                            </li>
                  })}
                </ul>
              </div>}
              {townsCollapse && <div className="mt-4 block">
                <button onClick={addTownHandler}><CgAddR className="md:text-3xl text-xl"/></button>
              </div>}
              <div className="hidden mt-4 sm:block">
                <button onClick={addTownHandler}><CgAddR className="md:text-3xl text-xl"/></button>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Link personali</p>
              {!linksCollapse && <div className="flex gap-2 mt-2 sm:hidden">
                <button onClick={toggleLinksCollapse}>
                  <BiCollapseHorizontal className="text-2xl"/>
                </button>
              </div>}
              {linksCollapse && <div className="flex gap-2 mt-2">
                <button onClick={toggleLinksCollapse}>
                  <BiCollapseVertical className="text-2xl"/>
                </button>
              </div>}
              <div className="hidden sm:block text-base font-medium text-navy-700 dark:text-white">
                <ul>
                  {currentCook && currentCook.personalLinks && currentCook.personalLinks.map((link, index) => {
                    return( 
                      <li key={nanoid()}>
                        <a href={link.linkSource} target="_blank">
                          {link.linkName}
                        </a>
                        <button 
                          className="ml-2"
                          onClick={() => deleteLinkHandler(index)}
                        >
                          <RiDeleteBin5Line className="text-xl"/>
                        </button>
                      </li>
                  )})}
                </ul>
              </div>
              {linksCollapse && <div className="block text-base font-medium text-navy-700 dark:text-white">
                <ul>
                  {currentCook && currentCook.personalLinks && currentCook.personalLinks.map((link, index) => {
                    return( 
                      <li key={nanoid()}>
                        <a href={link.linkSource} target="_blank">
                          {link.linkName}
                        </a>
                        <button 
                          className="ml-2"
                          onClick={() => deleteLinkHandler(index)}
                        >
                          <RiDeleteBin5Line className="text-xl"/>
                        </button>
                      </li>
                  )})}
                </ul>
              </div>}
              {linksCollapse && <div className="mt-4 block">
                <button onClick={addLinkHandler}><CgAddR className="md:text-3xl text-xl"/></button>
              </div>}
              <div className="hidden mt-4 sm:block">
                <button onClick={addLinkHandler}><CgAddR className="md:text-3xl text-xl"/></button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  onChange={toggleOnline}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <label htmlFor="toggle" className="text-xs text-gray-700">
                {online && <span>Online</span>}
                {!online && <span>Offline</span>}
              </label>
            </div>
          </div>
          <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium flex justify-center items-center">
            <button
              onClick={saveFunction}
              disabled={!change}
              className="xl:w-[220px] lg:w-[200px] md:w-[180px] w-[160px] px-4 py-2 my-2 lg:font-bold font-normal text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Salva
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CookInfo;
