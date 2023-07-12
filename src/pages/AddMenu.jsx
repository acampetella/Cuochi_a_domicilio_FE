import React from "react";
import Logo from "../components/Logo";
import { MdAdd } from "react-icons/md";
import { setCourseModalShow, courseModalShow } from "../reducers/addCourseModalReducer";
import { cookMenuCourses } from "../reducers/cookMenuReducer";
import { useDispatch, useSelector } from "react-redux";
import AddCourseModal from "../components/AddCourseModal";
import { useState, useEffect } from "react";

const AddMenu = () => {

  const dispatch = useDispatch();
  const showModal = useSelector(courseModalShow);
  const menuCourses = useSelector(cookMenuCourses);
  const [cookMenu, setCookMenu] = useState({
    name: '',
    price: '',
    courses: []
  });

  const addCourseHandler = () => {
    dispatch(setCourseModalShow(true));
  };

  const onChangeHandler = (event) => {
    setCookMenu(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const menu = {...cookMenu, courses: menuCourses};
    setCookMenu(menu);
  }, [menuCourses]);

  return (
    <div className="font-[DM_Sans] bg-green-800 w-screen h-screen flex items-center">
      {showModal && <AddCourseModal/>}
      <div className="w-full lg:w-4/5 lg:h-4/5 bg-white p-5 rounded-lg lg:rounded-l-none m-auto">
        <h1 className="pt-4 text-2xl font-bold text-center">Nuovo menu</h1>
        <div className="w-full h-3/5 flex flex-col items-center">
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded w-full">
            <div className="w-full flex justify-between">
              <div className="w-1/2 flex flex-col justify-start items-center">
                <label htmlFor="" className="w-1/2 text-base font-bold text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={cookMenu.name}
                  onChange={onChangeHandler}
                  className="w-1/2 text-base p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2 flex flex-col justify-start items-center">
                <label htmlFor="" className="w-1/2 text-base font-bold text-gray-700">
                  Prezzo
                </label>
                <input
                  type="text"
                  name="price"
                  value={cookMenu.price}
                  onChange={onChangeHandler}
                  className="w-1/2 text-base p-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </form>
          <div className="flex flex-col items-center mt-2">
            <label className="text-xl text-gray-700">Aggiungi portata</label>
              <button className="mt-3 ml-3" onClick={addCourseHandler}>
                <MdAdd className="text-4xl" />
              </button>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
