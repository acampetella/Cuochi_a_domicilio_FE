import React from "react";
import { useState, useEffect } from "react";
import getAccessKey from "../utilities/token/accessKey";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
import {FcApprove, FcDisapprove} from "react-icons/fc";
import Loader from "../components/Loader";
import { randomPassword } from "../utilities/password/generatePassword";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import { confirmDialogShow, confirmDialogButtonPressed } from "../reducers/confirmDialogReducer";
import { setConfirmDialogShow, setConfirmDialogButtonPressed } from "../reducers/confirmDialogReducer";
import { useDispatch, useSelector } from "react-redux";

const AdminProfile = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [enableButton, setEnableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [approveAction, setApproveAction] = useState(false);
  const [disapproveAction, setDisapproveAction] = useState(false);
  const [candidateSelected, setCandidateSelected] = useState(null);
  const token = getAccessKey();
  const dispatch = useDispatch();
  const showDialog = useSelector(confirmDialogShow);
  const confirmButtonPressed = useSelector(confirmDialogButtonPressed);

  const getCandidates = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cooksCandidates?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          }
        }
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        let arr = [];
        candidates.forEach((candidate) => arr.push(candidate));
        response.candidates.forEach((candidate) => arr.push(candidate));
        setCandidates(arr);
        if (currentPage === response.totalPages || response.count === 0) {
          setEnableButton(false);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
        const myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
    } catch (error) {
      setIsLoading(false);
      const myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };

  const loadButtonHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const acceptCandidateHandler = (index) => {
      setCandidateSelected(candidates[index]);
      const message = `Stai accettando la richiesta del candidato ${candidates[index].firstName} ${candidates[index].lastName}.
      Vuoi procedere ?`;
      setDialogMessage(message);
      setApproveAction(true);
      setDisapproveAction(false);
      dispatch(setConfirmDialogShow(true));
  };

  const rejectCandidateHandler = (index) => {
    setCandidateSelected(candidates[index]);
    const message = `Stai rifiutando la richiesta del candidato ${candidates[index].firstName} ${candidates[index].lastName}.
    Vuoi procedere ?`;
    setDialogMessage(message);
    setApproveAction(false);
    setDisapproveAction(true);
    dispatch(setConfirmDialogShow(true));
  };

  const getWelcomeMessage = (username, password) => {
    const message = 
    `Gentile candidato,
    siamo lieti di informarla che la sua richiesta è stata accetata.
    A tal proposito le comunichiamo le credenziali di accesso al sistema:

    username: ${username}
    password: ${password}

    In bocca al lupo per questa nuova avventura.

    Lo staff di Cuochi a Domicilio`;
    return message;
  };

  const getRejectMessage = () => {
    const message = 
    `Gentile candidato,
    siamo spiacenti di informarla che non possiamo accettare la sua richiesta.
    Ad ogni modo, la ringraziamo per aver presentato la sua candidatura.

    Lo staff di Cuochi a Domicilio`;
    return message;
  };

  const approveCandidate = async (candidate, password) => {
    /*
      1 - creare l'utente cuoco
      2 - cancellare l'utente dalla tabella dei candidati
      3 - inviare mail
    */
    await createCookUser(candidate, password);
    await deleteCandidate(candidate);

  };

  const disapproveCandidate = async (candidate) => {
    /*
      1 - cancellare l'utente dalla tabella dei candidati
      2 - inviare mail
    */
    await deleteCandidate(candidate);
  };

  const createCookUser = async (candidate, psw) => {
    const cook = {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phones: [candidate.phone],
      password: psw
    }
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cooks`, {
        method: "POST",
        body: JSON.stringify(cook),
        headers: {
          Auth: token,
          "Content-Type": "application/json",
        }
      });
      const response = await data.json();
      if (response.statusCode !== 201) {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteCandidate = async (candidate) => {
    const id = candidate._id;
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cooksCandidates/${id}`, {
        method: "DELETE",
        headers: {
          Auth: token
        }
      });
      const response = await data.json();
      if (response.statusCode !== 200) {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error);
    }

  };

  const sendEmail = () => {

  }

  const resetDialogParameters = () => {
    dispatch(setConfirmDialogButtonPressed(null));
    dispatch(setConfirmDialogShow(false));
    setDialogMessage("");
  };


  useEffect(() => {
    getCandidates();
  }, [currentPage]);

  useEffect(() => {
    if (confirmButtonPressed !== null && (approveAction || disapproveAction)) {
      try {
        if (approveAction) {
          if (confirmButtonPressed) {
            const password = randomPassword(8);
            approveCandidate(candidateSelected, password).then(() => {
              setCandidates(candidates.splice(0, candidates.length));
            }).then(() => {
              getCandidates();
              const myToast = new Toast("Operation performed");
              myToast.notifyMessage();
            });
          }
        }
        if (disapproveAction) {
          if (confirmButtonPressed) {
            disapproveCandidate(candidateSelected).then(() => {
              setCandidates(candidates.splice(0, candidates.length));
            }).then(() => {
              getCandidates();
              const myToast = new Toast("Operation performed");
              myToast.notifyMessage();
            });
          }
        }
        resetDialogParameters();
        setApproveAction(false);
        setDisapproveAction(false);
        setCandidateSelected(null);
      } catch (error) {
        const myToast = new Toast(error.toString());
        myToast.notifyError();
      }
    }
  }, [confirmButtonPressed]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {showDialog && <ConfirmDialogBox message={dialogMessage}/>}
      {isLoading && <Loader/>}
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div>
          <div className="p-4">
            <div className="bg-white p-4 rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">
                  Candidati cuochi
                </h2>
                <div>
                  <div>
                    <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                      <div className="w-[130px] lg:min-w-[200px]">
                        <span>Nome</span>
                      </div>
                      <div className="hidden lg:block lg:min-w-[200px]">
                        <span>Email</span>
                      </div>
                      <div className="hidden lg:block lg:min-w-[200px]">
                        <span>Telefono</span>
                      </div>
                      <div className="lg:min-w-[200px]">
                        <span>Curriculum</span>
                      </div>
                      <div className="lg:min-w-[200px]">
                        <span>Azione</span>
                      </div>
                    </div>
                    {candidates &&
                      candidates.map((candidate, index) => {
                        return (
                          <div key={nanoid()}>
                            <div className="flex justify-between py-2 text-md">
                              <div className="m-2 lg:m-0 w-[130px] lg:min-w-[200px]">
                                <span>{`${candidate.firstName} ${candidate.lastName}`}</span>
                              </div>
                              <div className="hidden lg:block lg:min-w-[200px]">
                                <span>{candidate.email}</span>
                              </div>
                              <div className="hidden lg:block lg:min-w-[200px]">
                                <span>{candidate.phone}</span>
                              </div>
                              <div className="lg:min-w-[200px]">
                                <a href={candidate.resume} className="underline">CV</a>
                              </div>
                              <div className="lg:min-w-[200px]">
                                <button
                                  onClick={() => acceptCandidateHandler(index)}
                                >
                                  <FcApprove size={30}/>
                                </button>
                                <button
                                  onClick={() => rejectCandidateHandler(index)}
                                >
                                  <FcDisapprove size={30}/>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            {enableButton && 
            <button
              className="w-[120px] px-4 py-2 my-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              onClick={loadButtonHandler}
            >
              Carica
            </button>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProfile;