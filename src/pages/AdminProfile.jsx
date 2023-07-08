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

const AdminProfile = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [enableButton, setEnableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = getAccessKey();

  const getCandidates = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cooksCandidates?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        let arr = [];
        candidates.forEach((candidate) => arr.push(candidate));
        response.candidates.forEach((candidate) => arr.push(candidate));
        setCandidates(arr);
        if (currentPage === response.totalPages) {
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

  useEffect(() => {
    getCandidates();
  }, [currentPage]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
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
                      candidates.map((candidate) => {
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
                                <button><FcApprove size={30}/></button>
                                <button><FcDisapprove size={30}/></button>
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