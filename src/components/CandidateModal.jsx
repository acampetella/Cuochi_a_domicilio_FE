import React from "react";
import { setCandidateModalShow, candidateModalTitle, candidateModalConfirmFunction, 
    candidateModalText, setCandidateModalText, setCandidateModalTitle, setCandidateConfirmFunction } 
    from "../reducers/candidateModalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CandidateModal = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const title = useSelector(candidateModalTitle);
  const confirmFunction = useSelector(candidateModalConfirmFunction);
  const modalText = useSelector(candidateModalText);
  

  const cancelHandler = () => {
    dispatch(setCandidateModalText(""));
    dispatch(setCandidateModalTitle(""));
    dispatch(setCandidateConfirmFunction(null));
    dispatch(setCandidateModalShow(false));
  };

  const confirmlHandler = () => {
    //confirmFunction();
    dispatch(setCandidateModalShow(false));
  };

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(modalText);
  }, []);

  return (
    <div className="flex justify-center w-full fixed z-10 items-center antialiased">
      <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div className="flex flex-col px-6 py-5 bg-gray-50">
          <p className="mb-2 font-semibold text-gray-700">{title}</p>
          <textarea
            type="text"
            className="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-48"
            value={text}
            onChange={onChangeHandler}
          ></textarea>
          <hr />
        </div>
        <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
          <button 
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
            onClick={cancelHandler}
            >
            Annulla
          </button>
          <button 
            className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
            onClick={confirmlHandler}
            >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
