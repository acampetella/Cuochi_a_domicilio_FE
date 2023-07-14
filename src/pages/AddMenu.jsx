import React from "react";
import { MdAdd } from "react-icons/md";
import {
  setCourseModalShow,
  courseModalShow,
} from "../reducers/addCourseModalReducer";
import { cookMenuCourses, setCookMenuCourses } from "../reducers/cookMenuReducer";
import { useDispatch, useSelector } from "react-redux";
import AddCourseModal from "../components/AddCourseModal";
import { useState, useEffect } from "react";
import { getFileURL } from "../utilities/fileManagers/fielURL";
import MenuCourseCard from "../components/MenuCourseCard";
import { nanoid } from "@reduxjs/toolkit";
import { cook, setCook } from "../reducers/cookReducer";
import getAccessKey from "../utilities/token/accessKey";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../utilities/fileManagers/imageUpload";

const AddMenu = () => {
  const dispatch = useDispatch();
  const currentCook = useSelector(cook);
  const showModal = useSelector(courseModalShow);
  const menuCourses = useSelector(cookMenuCourses);
  const [cookMenu, setCookMenu] = useState({
    name: "",
    price: "",
    courses: []
  });
  const token = getAccessKey();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const addCourseHandler = () => {
    dispatch(setCourseModalShow(true));
  };

  const onChangeHandler = (event) => {
    setCookMenu((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const check = () => {
    if (cookMenu.name !== '' && cookMenu.price !== '' && cookMenu.courses.length > 0 ) {
      return true;
    }
    return false;
  };

  const getNewMenu = () => {
    const newMenu = {
      name: cookMenu.name,
      price: Number(cookMenu.price),
      courses: cookMenu.courses
    };
    return newMenu;
  };

  const getNewCook = (newMenu) => {
    let currentMenus = [...currentCook.menus];
    currentMenus.push(newMenu);
    let newCook = {...currentCook, menus: currentMenus}
    return newCook;
  }

  const saveHandler = async () => {
    if (check()) {
      let newMenu = getNewMenu();
      let courses = newMenu.courses;
      let uploadsResult = true;
      setIsLoading(true);
      try {
        let newCourses = new Array(courses.length);
        for(let i = 0; i < courses.length; i++) {
          const imageUploaded = await imageUpload(courses[i].courseImage,
            `${process.env.REACT_APP_SERVER_BASE_URL}/internal/coursesImagesUpload`, 'img', token);
            if (imageUploaded === undefined) {
              uploadsResult = false;
            } else {
              const newCourse = {
                courseName: courses[i].courseName,
                courseType: courses[i].courseType,
                courseDescription: courses[i].courseDescription,
                courseImage: imageUploaded.img
              };
              newCourses[i] = newCourse;
            }
        }
        if (uploadsResult) {
          newMenu = {...newMenu, courses: newCourses};
          const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/menus/${currentCook._id}`, {
            method: "POST",
            body: JSON.stringify(newMenu),
            headers: {
              Auth: token,
              "Content-Type": "application/json",
              }
          });
          const response = await data.json();
          if (response.statusCode === 201) {
            const newCook = getNewCook(newMenu);
            dispatch(setCook(newCook));
            setIsLoading(false);
            dispatch(setCookMenuCourses([]));
            navigate("/cookMenus", { replace: true });
          } else {
            setIsLoading(false);
            const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
            let myToast = new Toast(errorMessage);
            myToast.notifyError();
          }
        } else {
          setIsLoading(false);
          let myToast = new Toast("Files upload error");
          myToast.notifyError();
        }
      } catch (error) {
        setIsLoading(false);
        let myToast = new Toast(error.toString());
        myToast.notifyError();
      }
    } else {
      let myToast = new Toast("Data check error");
      myToast.notifyError();
    }
  }

  useEffect(() => {
    const menu = { ...cookMenu, courses: menuCourses };
    setCookMenu(menu);
  }, [menuCourses]);

  return (
    <div className="font-[DM_Sans] bg-green-800 w-screen min-h-screen py-4 sm:px-4 px-2 flex justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader/>}
      {showModal && <AddCourseModal />}
      <div className="sm:w-11/12 w-full min-h-screen bg-white rounded-lg">
        <h1 className="text-center font-bold text-2xl my-2">Nuovo Menù</h1>
        <div className="flex w-full justify-between">
          <div className="ml-8 w-1/3 flex flex-col">
            <label className="text-2xl">Aggiungi portata</label>
            <button onClick={addCourseHandler}>
              <MdAdd className="text-4xl" />
            </button>
          </div>
          <div className="flex lg:flex-row flex-col w-2/3 mx-2">
            <div className="flex flex-col w-full">
              <label className="md:w-2/3 w-full font-bold">Nome</label>
              <input
                type="text"
                name="name"
                value={cookMenu.name}
                onChange={onChangeHandler}
                className="md:w-2/3 w-full px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <label className="md:w-2/3 w-full font-bold">Prezzo</label>
                <input
                  type="text"
                  name="price"
                  value={cookMenu.price}
                  onChange={onChangeHandler}
                  className="md:w-2/3 w-full px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap my-4 mx-4">
          {menuCourses &&
            menuCourses.map((course) => {
              const url = getFileURL(course.courseImage);
              return (
                <MenuCourseCard
                  key={nanoid()}
                  title={course.courseName}
                  description={course.courseDescription}
                  image={url}
                  type={course.courseType}
                />
              );
            })}
        </div>
        <div className="flex justify-center my-2">
          <button
          onClick={saveHandler}
            className="w-[150px] px-4 py-2 text-xl font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
