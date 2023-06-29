import React from "react";
import Logo from "../components/Logo";
import { useState } from "react";
import { getFormDataValidation } from "../utilities/validations/formDataValidation";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Loader from "../components/loaders/Loader";
import {Link} from "react-router-dom";

const UserRegistration = () => {

  const formDataInitialValue = {
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const valuesTypes = ["string", "string", "string", "string", "string", "string"];

  const [formData, setFormData] = useState(formDataInitialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const checkFormData = () => {
    return getFormDataValidation(formData, valuesTypes);
  };

  const checkPassword = () => {
    if (formData.password === formData.confirmPassword) {
      return true;
    }
    return false;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    const result = checkFormData();
    if (result === true) {
      if (checkPassword()) {
        const newFormData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate,
          email: formData.email,
          password: formData.password
        };
        setIsLoading(true);
        try {
          const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify(newFormData),
            headers: {
              "Content-Type": "application/json"
            }
          });
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
          setIsLoading(false);
        } catch (error) {
          myToast = new Toast(error.toString());
          myToast.notifyError();
        }
      } else {
        myToast = new Toast("Password confirmation failed");
        myToast.notifyError();
      }
    } else {
      myToast = new Toast(result);
      myToast.notifyError();
    }

  };

  return (
    <div className="font-[DM_Sans] bg-green-800 w-screen h-screen flex items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader/>}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <img
              src="https://myfoodstory.com/wp-content/uploads/2023/01/air-fryer-pasta-square-2-600x800.jpg"
              alt=""
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            />
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Crea un Account!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Nome
                    </label>
                    <input
                      className="w-full lg:w-[200px] xl:w-[220px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Nome"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lg:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Cognome
                    </label>
                    <input
                      className="w-full lg:w-[200px] xl:w-[220px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Cognome"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Data di nascita
                    </label>
                    <input
                      className="w-full lg:w-[200px] xl:w-[220px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lg:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full lg:w-[200px] xl:w-[220px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Indirizzo email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <input
                      className="w-full lg:w-[200px] xl:w-[220px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lg:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Conferma password
                    </label>
                    <input
                      className="w-full lg:w-[200px] xl:w-[220px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Conferma password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Registrati
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    to={"/cookCandidateRegistration"}
                  >
                    Vuoi candidarti come cuoco? Clicca qui!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    to={"/login"}
                  >
                    Hai già un account? Login!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    to={"/"}
                  >
                    Torna alla Home!
                  </Link>
                </div>
                <div className="flex justify-center mt-5">
                  <Logo/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
