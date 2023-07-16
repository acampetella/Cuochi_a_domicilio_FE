import React from "react";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmDialogShow,
  confirmDialogButtonPressed,
} from "../reducers/confirmDialogReducer";
import {
  setConfirmDialogShow,
  setConfirmDialogButtonPressed,
} from "../reducers/confirmDialogReducer";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { CgDetailsMore, CgDetailsLess} from "react-icons/cg";
import { nanoid } from "nanoid";
import getDecodeSession from "../utilities/token/decodeSession";
import getAccessKey from "../utilities/token/accessKey";
import { positiveStateChange, negativeStateChange } from "../utilities/requests/requestsStateManager";
import DisplayRequest from "../components/DisplayRequest";

const RequestsManager = () => {
  const dispatch = useDispatch();
  const showDialog = useSelector(confirmDialogShow);
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [dialogMessage, setDialogMessage] = useState("");
  const [approveAction, setApproveAction] = useState(false);
  const [disapproveAction, setDisapproveAction] = useState(false);
  const [requestSelected, setRequestSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enableButton, setEnableButton] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isCook, setIsCook] = useState(false);
  const [details, setDetails] = useState([]);
  const [showDeatils, setShowDetails] = useState(false);
  const confirmButtonPressed = useSelector(confirmDialogButtonPressed);
  const user = getDecodeSession();
  const token = getAccessKey();

  const toggleDetails = (index) => {
    setRequestSelected(requests[index]);
    let arr = [...details];
    arr[index] = !details[index];
    if (arr[index] === true) {
      for(let i = 0; i < arr.length; i++) {
        if (i !== index) {
          arr[i] = false;
        }
      }
      setShowDetails(true);
      console.log(requestSelected);
    } else {
      setShowDetails(false);
    }
    setDetails(arr);
  };

  const setInitialDetails = () => {
    const arr = new Array(requests.length);
    for(let i = 0; i < arr.length; i++) {
      arr[i] = false;
    }
    setDetails(arr);
  };

  const loadButtonHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const dateReverse = (date) => {
    const arr = date.split('-').reverse();
    const result = arr.join('-');
    return result;
  }

  const getRequests = async (endpoint) => {
    setIsLoading(true);
    try {
        const data = await fetch(endpoint, {
            headers: {
                Auth: token,
                "Content-Type": "application/json"
              }
        });
        const response = await data.json();
        setIsLoading(false);
        if (response.statusCode === 200) {
            return response;
        } else {
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

  const approveRequestHandler = (index) => {
    setRequestSelected(requests[index]);
    const message = `Stai accettando la richiesta. Vuoi procedere ?`;
    setDialogMessage(message);
    setApproveAction(true);
    setDisapproveAction(false);
    dispatch(setConfirmDialogShow(true));

  };

  const disapproveRequestHandler = (index) => {
    setRequestSelected(requests[index]);
    let message;
    if (requests[index].state === "created") {
        message = 'Stai eliminando la richiesta. Vuoi procedere ?';
    } else {
        message = `Stai rigettando la richiesta. Vuoi procedere ?`;
    }
    setDialogMessage(message);
    setApproveAction(false);
    setDisapproveAction(true);
    dispatch(setConfirmDialogShow(true));
  };

  const deleteRequest = async () => {
    const id = requestSelected._id;
    setIsLoading(true);
    try {
        const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/requests/${id}`, {
            method: "DELETE",
            headers: {
                Auth: token,
                "Content-Type": "application/json"
              }
        });
        const response = await data.json();
        setIsLoading(false);
        if (response.statusCode !== 200) {
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

  const changeRequestState = async (result) => {
    const id = requestSelected._id;
    setIsLoading(true);
    try {
        const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/requests/${id}`, {
            method: "PATCH",
            body: JSON.stringify(result),
            headers: {
                Auth: token,
                "Content-Type": "application/json"
              }
        });
        const response = await data.json();
        setIsLoading(false);
        if (response.statusCode !== 200) {
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

  const resetDialogParameters = () => {
    dispatch(setConfirmDialogButtonPressed(null));
    dispatch(setConfirmDialogShow(false));
    setDialogMessage("");
  };

  useEffect(() => {
    if (confirmButtonPressed !== null && (approveAction || disapproveAction)) {
      try {
        if (confirmButtonPressed) {
            let result;
            let changeState = false;
          if (approveAction) {
            changeState = true;
            result = positiveStateChange(requestSelected);
          } else {
            if (requestSelected.state === 'created') {
                changeState = false;
            } else {
                changeState = true;
                result = negativeStateChange(requestSelected);
            }
          }
          if (changeState) {
            changeRequestState(result).then(() => {
                let endpoint;
                const id = user.id;
                if (isUser) {
                    endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/requests/byUserId/${id}?page=${currentPage}&pageSize=10`;
                } else {
                    endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/requests/byCookId/${id}?page=${currentPage}&pageSize=10`; 
                }
                getRequests(endpoint).then((response) => {
                    setRequests(response.requests);
                    const myToast = new Toast("Operation performed");
                    myToast.notifyMessage();
                });
            }).catch((error) => {
                const myToast = new Toast(error.toString());
                myToast.notifyError();
            });
          } else {
            deleteRequest().then(() => {
                let endpoint;
                const id = user.id;
                if (isUser) {
                    endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/requests/byUserId/${id}?page=${currentPage}&pageSize=10`;
                } else {
                    endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/requests/byCookId/${id}?page=${currentPage}&pageSize=10`; 
                }
                getRequests(endpoint).then((response) => {
                    setRequests(response.requests);
                    const myToast = new Toast("Operation performed");
                    myToast.notifyMessage();
                });
            }).catch((error) => {
                const myToast = new Toast(error.toString());
                myToast.notifyError();
            });
          }
        }
        resetDialogParameters();
        setApproveAction(false);
        setDisapproveAction(false);
        setRequestSelected(null);
      } catch (error) {
        const myToast = new Toast(error.toString());
        myToast.notifyError();
      }
    }
  }, [confirmButtonPressed]);

  useEffect(() => {
    let endpoint;
    const id = user.id;
    if (user.role === "user") {
      setIsUser(true);
      setIsCook(false);
      endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/requests/byUserId/${id}?page=${currentPage}&pageSize=10`;
    } else if (user.role === "cook") {
        endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/requests/byCookId/${id}?page=${currentPage}&pageSize=10`;
      setIsCook(true);
      setIsUser(false);
    }
    getRequests(endpoint).then((response) => {
        setRequests(response.requests);
        if (currentPage === response.totalPages || response.count === 0) {
            setEnableButton(false);
        }
    });
    setInitialDetails();
  }, [currentPage]);

  return (
    <div className="w-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {showDialog && <ConfirmDialogBox message={dialogMessage} />}
      {isLoading && <Loader />}
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div>
          <div className="p-4">
            <div className="bg-white p-4 rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">
                  Lista richieste
                </h2>
                <div>
                  <div>
                    <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                      {isCook && (
                        <div className="w-[130px] xl:min-w-[200px]">
                          <span>Nome utente</span>
                        </div>
                      )}
                      {isUser && (
                        <div className="w-[130px] xl:min-w-[200px]">
                          <span>Nome cuoco</span>
                        </div>
                      )}
                      <div className="xl:min-w-[200px]">
                        <span>Data</span>
                      </div>
                      <div className="hidden xl:block xl:min-w-[200px]">
                        <span>Intervallo</span>
                      </div>
                      <div className="hidden xl:block xl:min-w-[200px]">
                        <span>Luogo</span>
                      </div>
                      <div className="hidden sm:block xl:min-w-[200px]">
                        <span>Stato</span>
                      </div>
                      <div className="xl:min-w-[200px]">
                        <span>Azione</span>
                      </div>
                    </div>
                    {requests &&
                      requests.map((request, index) => {
                        return (
                          <div key={nanoid()}>
                            <div className="flex justify-between py-2 text-md">
                              {isCook && (
                                <div className="ml-3 xl:m-0 w-[130px] xl:min-w-[200px]">
                                  <span>{`${request.user.firstName} ${request.user.lastName}`}</span>
                                </div>
                              )}
                              {isUser && (
                                <div className="ml-3 xl:m-0 w-[130px] xl:min-w-[200px]">
                                  <span>{`${request.cook.firstName} ${request.cook.lastName}`}</span>
                                </div>
                              )}
                              <div className="xl:min-w-[200px]">
                                <span>{dateReverse(request.date)}</span>
                              </div>
                              <div className="hidden xl:block xl:min-w-[200px]">
                                <span>{`${request.from} - ${request.to}`}</span>
                              </div>
                              <div className="hidden xl:block xl:min-w-[200px]">
                                <span>{`${request.place.town} (${request.place.province})`}</span>
                              </div>
                              <div className="hidden sm:block xl:min-w-[200px]">
                                <span>{request.state}</span>
                              </div>
                              <div className="xl:min-w-[200px]">
                                <button 
                                    disabled={request.owner !== user.role}
                                    onClick={() => approveRequestHandler(index)}
                                >
                                  <FcApprove size={30} />
                                </button>
                                <button 
                                    disabled={request.owner !== user.role}
                                    onClick={() => disapproveRequestHandler(index)}
                                >
                                  <FcDisapprove size={30} />
                                </button>
                                {!details[index] && <button onClick={() => toggleDetails(index)}>
                                  <CgDetailsMore size={30} />
                                </button>}
                                {details[index] && <button onClick={() => toggleDetails(index)}>
                                  <CgDetailsLess size={30} />
                                </button>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            {showDeatils && <DisplayRequest request={requestSelected}/>}
            {enableButton && (
              <button
                className="w-[120px] px-4 py-2 my-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                onClick={loadButtonHandler}
              >
                Carica
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestsManager;
