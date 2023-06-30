import React from 'react';
import Logo from '../components/Logo';
import { useState, useEffect } from "react";
import { getFormDataValidation } from "../utilities/validations/formDataValidation";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Loader from "../components/Loader";
import {Link, useNavigate} from "react-router-dom";
import getDecodeSession from "../utilities/token/decodeSession";

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      selectPath();
    }
  }, [navigate]);

  const formDataInitialValue = {
    email: "",
    password: ""
  };

  const valuesTypes = ["string", "string"];

  const [formData, setFormData] = useState(formDataInitialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    const result = checkFormData();
    if (result === true) {
      setIsLoading(true);
      try {
        const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        });
        const response = await data.json();
        if (response.statusCode === 200) {
          setIsLoading(false);
          localStorage.setItem("session", response.token);
          setFormData(formDataInitialValue);
          selectPath();
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

  const checkFormData = () => {
    return getFormDataValidation(formData, valuesTypes);
  };

  const selectPath = () => {
    const user = getDecodeSession();
    if (user.role === 'admin') {
      navigate("/adminProfile", { replace: true });
    } else if (user.role === 'cook') {
      navigate("/cookProfile", { replace: true });
    } else if (user.role === 'user') {
      navigate("/userProfile", { replace: true });
    } else {
      navigate("/", { replace: true });
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
              src="https://images.immediate.co.uk/production/volatile/sites/2/2015/07/12149.jpg"
              alt=""
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            />
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Login</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="mb-4 mr-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 mr-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center mt-8">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <Link 
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    to={"/"}
                  >
                    Torna alla Home!
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block text-blue-500 align-baseline hover:text-blue-800"
                    to={"/userRegistration"}
                  >
                    Non hai un account? Registrati!
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
  )
}

export default Login;