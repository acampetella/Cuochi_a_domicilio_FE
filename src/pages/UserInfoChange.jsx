import React from "react";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { getFormDataValidation } from "../utilities/validations/formDataValidation";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import getDecodeSession from "../utilities/token/decodeSession";
import getAccessKey from "../utilities/token/accessKey";
import { useNavigate } from "react-router-dom";

const UserInfoChange = () => {

    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const valuesTypes = ["string", "string", "string"];
    const navigate = useNavigate();
    const token = getAccessKey();

    useEffect(() => {
        setFormData(getDecodeSession());
    }, []);


  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const checkFormData = () => {
    const newFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate
    };
    return getFormDataValidation(newFormData, valuesTypes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    const result = checkFormData();
    if (result === true) {
        try {
            setIsLoading(true);
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${formData.id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    "Auth": token,
                    "Content-Type": "application/json"
                }
            });
            const response = await data.json();
            if (response.statusCode === 200) {
                const newFormData = {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  birthDate: formData.birthDate
                };
                const data2 = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/getNewToken`, {
                method: "POST",
                body: JSON.stringify(newFormData),
                headers: {
                  "Auth": token,
                  "Content-Type": "application/json"
                  }
                });
                const response2 = await data2.json();
                if (response2.statusCode === 200) {
                  const newToken = response2.newToken;
                  localStorage.clear();
                  localStorage.setItem("session", newToken);
                  setIsLoading(false);
                  navigate("/userProfile", {replace:true});
                } else {
                  const errorMessage = `statusCode: ${response2.statusCode}, message: ${response2.message}`;
                  myToast = new Toast(errorMessage);
                  myToast.notifyError();
                }
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
      myToast = new Toast(result);
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
              src="https://s1.1zoom.me/b5050/744/Cocktail_Strawberry_Black_background_Design_515376_600x800.jpg"
              alt=""
              className="bg-gray-400 hidden xl:block xl:w-[600px] xl:h-auto bg-cover rounded-l-lg"
            />
            <div className="w-[600px] h-auto bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">
                Modifica info
              </h3>
              {formData && <form
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
                  <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Data di nascita
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="date"
                      name="birthDate"
                      onChange={handleChange}
                      value={formData.birthDate}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Salva
                  </button>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    to={"/userProfile"}
                  >
                    Torna al profilo!
                  </Link>
                </div>
                <div className="flex justify-center mt-5">
                  <Logo />
                </div>
              </form>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoChange;
