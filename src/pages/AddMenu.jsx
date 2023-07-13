import React from "react";
import Logo from "../components/Logo";
import { MdAdd } from "react-icons/md";
import {
  setCourseModalShow,
  courseModalShow,
} from "../reducers/addCourseModalReducer";
import { cookMenuCourses } from "../reducers/cookMenuReducer";
import { useDispatch, useSelector } from "react-redux";
import AddCourseModal from "../components/AddCourseModal";
import { useState, useEffect } from "react";
import { getFileURL } from "../utilities/fileManagers/fielURL";
import MenuCourseCard from "../components/MenuCourseCard";
import { nanoid } from "@reduxjs/toolkit";

const AddMenu = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(courseModalShow);
  const menuCourses = useSelector(cookMenuCourses);
  const [cookMenu, setCookMenu] = useState({
    name: "",
    price: "",
    courses: [],
  });

  const addCourseHandler = () => {
    dispatch(setCourseModalShow(true));
  };

  const onChangeHandler = (event) => {
    setCookMenu((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const menu = { ...cookMenu, courses: menuCourses };
    setCookMenu(menu);
  }, [menuCourses]);

  return (
    <div className="font-[DM_Sans] bg-green-800 w-screen min-h-screen p-12 flex justify-center">
      {showModal && <AddCourseModal />}
      <div className="w-11/12 min-h-screen bg-white rounded-lg">
        <div className="flex w-full">
          <div>
            <label className="text-xl">Aggiungi portata</label>
            <button><MdAdd className="text-4xl"/></button>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <label>Nome</label>
              <input type="text" name="" value=""/>
            </div>
            <div className="flex flex-col">
              <label>Prezzo</label>
              <input type="text" name="" value=""/>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
