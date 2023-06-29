import React from "react";
import Logo from "../components/Logo";
import { useState } from "react";
import { getFormDataValidation } from "../utilities/validations/formDataValidation";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import { getFormatFileValidation } from "../utilities/validations/formatFileValidation";
import Loader from "../components/loaders/Loader";

const CookCandidateRegistration = () => {
  const formDataInitialValue = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: "",
  };

  const valuesTypes = ["string", "string", "string", "string", "string"];
  const allowedFileFormats = ["pdf", "doc", "docx"];

  const [formData, setFormData] = useState(formDataInitialValue);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleFileChange = (event) => {
    handleChange(event);
    setFile(event.target.files[0]);
  };

  const checkFormData = () => {
    return getFormDataValidation(formData, valuesTypes);
  };

  const checkFileFormat = () => {
    return getFormatFileValidation(formData.resume, allowedFileFormats);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    const result = checkFormData();
    const checkFormat = checkFileFormat();
    if (result === true) {
      if (checkFormat === true) {
        //qui va fatta la fetch
        setIsLoading(true);
        try {
          const uploadedFile = await resumeUpload(
            file,
            `${process.env.REACT_APP_SERVER_BASE_URL}/internal/resumeUpload`
          );
          if (uploadedFile !== undefined) {
            const newFormData = {
              ...formData,
              resume: uploadedFile.resume
            };
            const data = await fetch(
              `${process.env.REACT_APP_SERVER_BASE_URL}/cooksCandidates`,
              {
                method: "POST",
                body: JSON.stringify(newFormData),
                headers: {
                  "Content-Type": "application/json"
                }
              }
            );
            const response = await data.json();
            if (response.statusCode === 201) {
              setIsLoading(false);
              myToast = new Toast("Operation successfully completed");
              myToast.notifyMessage();
              setFormData(formDataInitialValue);
            } else {
              const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
              myToast = new Toast(errorMessage);
              myToast.notifyError();
            }
          } else {
            myToast = new Toast("Operation failed: upload file error");
            myToast.notifyError();
          }
          setIsLoading(false);
        } catch (error) {
          myToast = new Toast(error.toString());
          myToast.notifyError();
        }
      } else {
        const errorMessage = `${checkFormat}. Allowed format: ${[...allowedFileFormats]}`;
        myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
    } else {
      myToast = new Toast(result);
      myToast.notifyError();
    }
  };

  const resumeUpload = async (file, endpoint) => {
    const fileData = new FormData();
    fileData.append("resume", file);

    try {
      const data = await fetch(endpoint, {
        method: "POST",
        body: fileData,
      });
      const response = await data.json();
      return response;
    } catch (error) {
      const myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };

  return (
    <div className="font-['DM_Sans'] bg-green-800 w-screen h-screen flex items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader/>}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full flex">
            <img
              src="https://www.robingoodlad.com/wp-content/uploads/2023/01/Food-photographer-Robin-Goodlad-1.jpg"
              alt=""
              className="bg-gray-400 hidden xl:block xl:w-[600px] xl:h-auto bg-cover rounded-l-lg"
            />
            <div className="w-[600px] h-auto bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">
                Invia la tua candidatura
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Nome
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Nome"
                      name="firstName"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Cognome
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Cognome"
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Indirizzo email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Telefono
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Telefono"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Curriculum
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      value={formData.resume}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Invia
                  </button>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Torna alla Home!
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Hai già un account? Login!
                  </a>
                </div>
                <div className="flex justify-center mt-5">
                  <Logo />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookCandidateRegistration;
