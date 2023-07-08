import React from "react";
import { useState, useEffect } from "react";
import getAccessKey from "../utilities/token/accessKey";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";

const AdminProfile = () => {
  const [candidates, setCandidates] = useState([]);
  const token = getAccessKey();

  const getCandidates = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cooksCandidates`,
        {
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        setCandidates(response.candidates);
      } else {
        const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
        const myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
    } catch (error) {
      const myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
                      <div>
                        <span>Nome</span>
                      </div>
                      <div>
                        <span>Email</span>
                      </div>
                      <div>
                        <span>Telefono</span>
                      </div>
                      <div>
                        <span>Curriculum</span>
                      </div>
                      <div>
                        <span>Azione</span>
                      </div>
                    </div>
                    {candidates &&
                      candidates.map((candidate) => {
                        return (
                          <div key={nanoid()}>
                            <div className="flex justify-between py-2 text-md">
                              <div>
                                <span>{`${candidate.firstName} ${candidate.lastName}`}</span>
                              </div>
                              <div>
                                <span>{candidate.email}</span>
                              </div>
                              <div>
                                <span>{candidate.phone}</span>
                              </div>
                              <div>
                                <a href={candidate.resume} className="underline">Curriculum</a>
                              </div>
                              <div>
                                <button>Accetta</button>
                                <button>Rifiuta</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;