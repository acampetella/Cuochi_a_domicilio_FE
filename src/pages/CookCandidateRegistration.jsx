import React from 'react';
import Logo from '../components/Logo';
import { useState } from 'react';
import { getFormDataValidation } from '../utilities/validations/formDataValidation';
import { Toaster } from 'react-hot-toast';
import { Toast } from '../utilities/notifications/toast';

const CookCandidateRegistration = () => {

  const formDataInitialValue = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    curriculum: ''
  };

  const valuesTypes = ['string', 'string', 'string', 'string', 'string'];

  const [formData, setFormData] = useState(formDataInitialValue);

  const handleChange = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
  };

  const checkFormData = () => {
    return getFormDataValidation(formData, valuesTypes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myToast;
    const result = checkFormData();
    if (result === true) {
      //qui va fatta la fetch
      try {
        const data = await fetch('http://localhost:5050/cooksCandidates', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          }
        });
        const response = await data.json();
        if (response.statusCode === 201) {
          myToast = new Toast('Operation successfully completed');
          myToast.notifyMessage();
          setFormData(formDataInitialValue);
        } else {
          const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
          myToast = new Toast(errorMessage);
          myToast.notifyError();
        }
      } catch (error) {
          myToast = new Toast(error.toString());
          myToast.notifyError();
      }
    } else {
      myToast = new Toast(result);
      myToast.notifyError();
    }
  }

  return (
    <div className="font-mono bg-green-800 w-screen h-screen flex items-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <img
              src="https://www.robingoodlad.com/wp-content/uploads/2023/01/Food-photographer-Robin-Goodlad-1.jpg"
              alt=""
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            />
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Invia la tua candidatura</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Nome
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Nome"
                      name='firstName'
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="lg:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Cognome
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Cognome"
                      name='lastName'
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </div>
                </div>
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="lg:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Indirizzo email"
                      name='email'
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Telefono
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder='Telefono'
                      name='phone'
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </div>
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Curriculum
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="file"
                      name='curriculum'
                      onChange={handleChange}
                      value={formData.curriculum}
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

export default CookCandidateRegistration;