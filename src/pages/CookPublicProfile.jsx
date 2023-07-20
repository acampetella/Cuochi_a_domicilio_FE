import React from "react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import MenuCourseCard from "../components/MenuCourseCard";
import { nanoid } from "nanoid";
import { Link, useParams } from "react-router-dom";
import { isAuth } from "../utilities/token/session";
import { useNavigate } from "react-router-dom";

const CookPublicProfile = () => {
  const { cookId } = useParams();
  const [cook, setCook] = useState({});
  const navigate = useNavigate();

  const getCookData = async () => {
    let myToast;
    try {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cooks/${cookId}`
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        setCook(response.cookExists);
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

  const reverseDate = (date) => {
    return date.split("-").reverse().join("-");
  };

  const contactButtonHandler = () => {
    if (!isAuth()) {
      navigate("../login", { replace: true });
    } else {
      navigate(`../requestForm/${cookId}`, { replace: true });
    }
  };

  useEffect(() => {
    getCookData();
  });

  return (
    <div className="h-full bg-gray-200 p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[500px]">
          {cook && cook.user && cook.user.cover && (
            <img
              src={cook.user.cover}
              className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
            />
          )}
        </div>
        <div className="flex flex-col items-center -mt-20">
          {cook && cook.user && cook.user.avatar && (
            <img
              src={cook.user.avatar}
              className="w-40 border-4 border-white rounded-full"
            />
          )}
          <div className="flex items-center space-x-2 mt-2">
            {cook && cook.user && (
              <p className="text-2xl">
                {`${cook.user.firstName} ${cook.user.lastName}`}
              </p>
            )}
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>
          <p className="text-gray-700">Cook</p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <button 
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                onClick={contactButtonHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
              <span>Contatta</span>
            </button>
            <a href="/" className="underline text-xl text-indigo-600">
              Home
            </a>
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">
              Informazioni personali
            </h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Nome</span>
                {cook && cook.user && (
                  <span className="text-gray-700">{`${cook.user.firstName} ${cook.user.lastName}`}</span>
                )}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Data di nascita:</span>
                {cook && cook.user && cook.user.birthDate && (
                  <span className="text-gray-700">
                    {reverseDate(cook.user.birthDate)}
                  </span>
                )}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                {cook && cook.user && cook.user.email && (
                  <span className="text-gray-700">{cook.user.email}</span>
                )}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Contatti:</span>
                {cook &&
                  cook.user &&
                  cook.user.phones &&
                  cook.user.phones.map((phone) => {
                    return (
                      <span key={nanoid()} className="text-gray-700 r-2">
                        {phone}
                      </span>
                    );
                  })}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Città coperte:</span>
                {cook &&
                  cook.towns &&
                  cook.towns.map((town) => {
                    return (
                      <span key={nanoid()} className="text-gray-700 r-2">
                        {town}
                      </span>
                    );
                  })}
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Link personali:</span>
                {cook &&
                  cook.personalLinks &&
                  cook.personalLinks.map((link) => {
                    return (
                      <a
                        key={nanoid()}
                        href={link.linkSource}
                        className="text-gray-700 r-2"
                      >
                        {link.linkName}
                      </a>
                    );
                  })}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full 2xl:w-2/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">About</h4>
            {cook && cook.description && (
              <p className="mt-2 text-gray-700">{cook.description}</p>
            )}
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-2xl text-gray-900 font-bold mb-2">
              Lista Menu
            </h4>
            {cook &&
              cook.menus &&
              cook.menus.map((menu) => {
                return (
                  <div key={nanoid()}>
                    <p className="text-2xl my-3">{menu.name}</p>
                    <p className="text-2xl my-3">{`${menu.price}$`}</p>
                    <div className="flex flex-wrap gap-2">
                      {menu.courses &&
                        menu.courses.map((course) => {
                          return (
                            <MenuCourseCard
                              key={nanoid()}
                              title={course.courseName}
                              type={course.courseType}
                              description={course.courseDescription}
                              image={course.courseImage}
                              activeDelete={false}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookPublicProfile;
