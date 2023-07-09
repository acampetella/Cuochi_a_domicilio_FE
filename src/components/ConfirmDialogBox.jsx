import React from 'react';
import { setConfirmDialogShow, setConfirmDialogButtonPressed } from "../reducers/confirmDialogReducer";
import { useDispatch } from "react-redux";

const ConfirmDialogBox = ({message}) => {

    const dispatch = useDispatch();

    const yesButtonHandler = () => {
        dispatch(setConfirmDialogButtonPressed(true));
        dispatch(setConfirmDialogShow(false));
    };

    const noButtonHandler = () => {
        dispatch(setConfirmDialogButtonPressed(false));
        dispatch(setConfirmDialogShow(false));
    };

  return (
    <div className="w-full max-w-md mx-auto p-6 fixed z-10 top-1/2 sm:left-1/3 left-1 ">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center relative mb-2">
            <p className="block text-2xl font-bold text-gray-800 dark:text-white">
                {message}
            </p>
          </div>
          <div className="mt-5 flex justify-center">
            <button
                onClick={yesButtonHandler}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 mr-2 w-[80px] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
                Si
            </button>
            <button
                onClick={noButtonHandler}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 w-[80px] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
                No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialogBox