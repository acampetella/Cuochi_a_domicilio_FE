import React from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuCourseCard from "../components/MenuCourseCard";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {cook, initialCook, cookChange } from "../reducers/cookReducer";
import { setCook, setInitialCook, setCookChange } from '../reducers/cookReducer';
import { checkCookChange } from "../utilities/validations/cookChangeValidation";
import { useEffect, useState } from "react";
import getDecodeSession from "../utilities/token/decodeSession";
import { Toast } from "../utilities/notifications/toast";
import { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const CookMenus = () => {
  const dispatch = useDispatch();
  const currentCook = useSelector(cook);
  const oldCook = useSelector(initialCook);
  const change = useSelector(cookChange);
  const session = getDecodeSession();
  const [isLoading, setIsLoading] = useState(false);

  const getCook = async () => {
    const userId = session.id;
    let myToast;
    setIsLoading(true);
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cooks/byUserId/${userId}`);
      const response = await data.json();
      if (response.statusCode === 200) {
        setIsLoading(false);
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

  return (
    <div className="font-[DM_Sans] w-screen min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      <Navbar />
      <div className="w-full min-h-screen bg-slate-100 p-4">
        <div className="flex flex-col mb-5">
          <label className="text-2xl">Aggiungi Menu</label>
          <Link to={"/addMenu"}>
            <button className="mt-3 ml-3">
              <MdAdd className="text-4xl" />
            </button>
          </Link>
        </div>
        <div className="w-full mb-2">
          {currentCook && currentCook.menus && currentCook.menus.map((menu) => {
            return (
              <div key={nanoid()} className="w-full mb-3 bg-white p-4 border border-sky-500 rounded-xl">
                <div>
                  <p>
                    <span className="font-bold text-2xl">Nome: </span>
                    <span className="text-2xl">{menu.name}</span>
                  </p>
                  <p>
                    <span className="font-bold text-2xl">Prezzo: </span>
                    <span className="text-2xl">{`${menu.price}$`}</span>
                  </p>
                </div>
                <div className="flex flex-wrap my-4 mx-4">
                  {menu.courses && menu.courses.map((course) => {
                    return (
                      <MenuCourseCard
                        key={nanoid()}
                        title={course.courseName}
                        description={course.courseDescription}
                        image={course.courseImage}
                        type={course.courseType}
                        activeDelete={false}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookMenus;
