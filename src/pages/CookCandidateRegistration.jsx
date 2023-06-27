import React from 'react';
import Logo from '../components/Logo';

const CookCandidateRegistration = () => {
  return (
    <div className="font-mono bg-green-800 w-screen h-screen flex items-center">
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
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 lg:flex lg:justify-between">
                  <div className="mb-4 lg:mr-2 lg:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Nome
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Nome"
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
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
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

export default CookCandidateRegistration