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

const CookInfo = () => {

  const dispatch = useDispatch();
  const [online, setOnline] = useState(false);
  const currentCook = useSelector(cook);
  const oldCook = useSelector(initialCook);
  const token = getDecodeSession();
  const showDescriptionModal = useSelector(cookDescriptionModalShow);
  const showTownModal = useSelector(cookTownModalShow);

  const toggleOnline = () => {
    setOnline(!online);
  };

  const getCook = async () => {
    const userId = token.id;
    let myToast;
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
    } catch (error) {
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

  const deleteTownHandler = (index) => {
    const arr = [...currentCook.towns];
    arr.splice(index, 1);
    const newCook = { ...currentCook, towns: arr };
    dispatch(setCook(newCook));
  }

  useEffect(() => {
    getCook().then((newCook) => {
      dispatch(setCook(newCook));
      dispatch(setInitialCook(newCook));
    });
  }, [dispatch]);

  useEffect(() => {
    const newCook = {...currentCook, available: online};
    dispatch(setCook(newCook));
  }, [online]);
  
  return (
    <div>
      <Navbar />
      {showDescriptionModal && <CookDescriptionModal/>}
      {showTownModal && <AddCookTownModal/>}
      <div className="flex flex-col justify-center items-center h-[100vh] bg-slate-100">
        <div className="relative flex flex-col items-center rounded-[20px] sm:w-1/2 w-3/5 max-w-[95%] sm:h-1/2 h-3/5 mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Una tua breve descrizione
            </h4>
            <p className="mt-2 px-2 text-base text-gray-600">
              {currentCook && <span>{currentCook.description}</span>}
              {currentCook && !currentCook.description && <span>Al momento non è presente alcuna descrizione</span>}
            </p>
            <div className="mt-4 ml-2">
              <button onClick={editDescriptionHandler}><LuEdit className="md:text-3xl text-xl"/></button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 flex flex-col px-2 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Città coperte</p>
              <div className="text-base font-medium text-navy-700 dark:text-white">
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
              <div className="mt-4">
                <button onClick={addTownHandler}><CgAddR className="md:text-3xl text-xl"/></button>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Link personali</p>
              <div className="text-base font-medium text-navy-700 dark:text-white">
                <ul>
                  {currentCook && currentCook.personalLinks && currentCook.personalLinks.map((link) => {
                    return <li key={nanoid()}><a href={link}></a></li>
                  })}
                </ul>
              </div>
              <div className="mt-4">
                <button><CgAddR className="md:text-3xl text-xl"/></button>
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
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CookInfo;
