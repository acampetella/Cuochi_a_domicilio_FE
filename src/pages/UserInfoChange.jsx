import React from "react";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { getFormDataValidation } from "../utilities/validations/formDataValidation";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, user } from '../reducers/userReducer';

const UserInfoChange = () => {

    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const valuesTypes = ["string", "string", "string"];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actualUser = useSelector(user);

    useEffect(() => {
        setFormData({
          firstName: actualUser.firstName,
          lastName: actualUser.lastName,
          birthDate: actualUser.birthDate
        });
    }, []);


  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const checkFormData = () => {
    return getFormDataValidation(formData, valuesTypes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    const result = checkFormData();
    if (result === true) {
        setIsLoading(true);
        const newUser = {
          ...actualUser,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate
        };
        dispatch(setUser(newUser));
        setIsLoading(false);
        navigate("/userProfile", { replace: true });
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
