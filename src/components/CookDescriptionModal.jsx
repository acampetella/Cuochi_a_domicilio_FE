import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCookDescriptionModalShow } from '../reducers/cookDescriptionModalReducer';
import { cook, setCook } from '../reducers/cookReducer';
import { useState, useEffect } from 'react';


const CookDescriptionModal = () => {

    const dispatch = useDispatch();
    const currentCook = useSelector(cook);
    const [description, setDescription] = useState("");

    const cancelButtonHandler = () => {
        dispatch(setCookDescriptionModalShow(false));
    };

    const saveButtonHandler = () => {
        const newCook = {...currentCook, description: description};
        dispatch(setCook(newCook));
        dispatch(setCookDescriptionModalShow(false));
    };

    const onChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        if (currentCook.description) {
            setDescription(currentCook.description);
        }
    }, []);

  return (
    <div className="fixed z-10 top-1/3 md:left-1/3 left-2 sm:w-[500px] w-4/5 min-w-[400px] items-center bg-gray-200 antialiased">
      <div className="flex flex-col w-full h-full mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-col px-6 py-5 bg-gray-50">
          <p className="mb-2 font-semibold text-gray-700">Descrizione</p>
          <textarea
            type="text"
            placeholder="Inserisci una descrizione..."
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-60"
            value={description}
            onChange={onChangeHandler}
          >
          </textarea>
          <hr />
        </div>
        <div
          className="flex flex-row items-center justify-center gap-2 p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
          <button 
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
            onClick={saveButtonHandler}
            >
            Salva
          </button>
          <button 
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
            onClick={cancelButtonHandler}
            >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookDescriptionModal