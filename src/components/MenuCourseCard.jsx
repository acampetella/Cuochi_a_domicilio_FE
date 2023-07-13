import React from "react";
import { useState } from "react";

const MenuCourseCard = ({ title, type, description, image }) => {

    const onDeleteHandler = () => {
        
    };

  return (
    <div className="flex items-center justify-center h-full mx-1 my-1">
      <div className="w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="max-w-md mx-auto">
          <div
            className="w-[300px]"
          >
            <img src={image} alt="Course Image" className="w-full object-cover bg-center" />
          </div>
          <div className="p-4 sm:p-6">
            <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
              {title}
            </p>
            <div className="flex flex-row">
              <p className="text-[17px] font-bold text-[#0FB478]">{type}</p>
            </div>
            <p className="text-[#7C7C80] font-[15px] mt-6">
              {description}
            </p>

            <button
                onClick={onDeleteHandler}
              className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
            >
              Elimina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCourseCard;
