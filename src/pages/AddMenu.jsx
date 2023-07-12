import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const AddMenu = () => {
  return (
    <div className="font-[DM_Sans] bg-green-800 w-screen h-screen flex items-center">
      <div className="w-full lg:w-4/5 lg:h-4/5 bg-white p-5 rounded-lg lg:rounded-l-none m-auto">
        <h3 className="pt-4 text-2xl text-center">Nuovo menu</h3>
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded w-full">
          <div className="w-full flex justify-between">
            <div className="w-1/2">
                <label htmlFor="">Nome</label>
                <input type="text" className="w-full text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
            </div>
            <div className="w-1/2">
                <label htmlFor="">Prezzo</label>
                <input type="text" className="w-full text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-5">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
