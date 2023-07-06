import React from "react";
import { useState } from "react";

const AddPhoneModal = () => {

    const [value, setValue] = useState("");
    console.log(value);

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const submitFunction = () => {

    };

  return (
    <div className="w-full max-w-md mx-auto p-6 fixed z-10 md:top-1/2 lg:left-1/2 md:left-1/3 top-3 left-0">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Inserisci contatto
            </h1>
          </div>
          <div className="mt-5">
            <form onSubmit={submitFunction}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Telefono
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      value={value}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhoneModal;
