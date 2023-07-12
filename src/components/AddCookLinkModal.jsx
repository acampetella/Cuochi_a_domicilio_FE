import React from 'react';
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setCookLinkModalShow } from '../reducers/cookLinkModalReducer';
import { setCook, cook } from '../reducers/cookReducer';
import { useState } from 'react';

const AddCookLinkModal = () => {

    const dispatch = useDispatch();
    const currentCook = useSelector(cook);
    const [linkName, setLinkName] = useState("");
    const [linkSource, setLinkSource] = useState("");

    const closeButtonHandler = () => {
        dispatch(setCookLinkModalShow(false));
    };

    const onChangeLinkNameHandler = (event) => {
        setLinkName(event.target.value);
    };

    const onChangeLinkSourceHandler = (event) => {
        setLinkSource(event.target.value);
    };

    const saveButtonHandler = (event) => {
        event.preventDefault();
        const arr = currentCook.personalLinks;
        const newArr = [...arr];
        newArr.push({
            linkName: linkName,
            linkSource: linkSource
        });
        const newCook = {...currentCook, personalLinks: newArr};
        dispatch(setCook(newCook));
        dispatch(setCookLinkModalShow(false));
    };

  return (
    <div className="w-full max-w-md mx-auto p-6 fixed z-10 md:top-1/2 md:left-1/3 top-3 left-0">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center relative">
            <button className="absolute top-0 right-0" onClick={closeButtonHandler}>
              <RiCloseCircleFill size={25}/>  
            </button>
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Inserisci un link personale
            </h1>
          </div>
          <div className="mt-5">
            <form onSubmit={saveButtonHandler}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="linkName"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Nome
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      value={linkName}
                      onChange={onChangeLinkNameHandler}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="linkSource"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Source
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      value={linkSource}
                      onChange={onChangeLinkSourceHandler}
                      required
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

export default AddCookLinkModal;