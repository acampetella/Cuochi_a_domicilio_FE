import React from 'react';
import Logo from '../components/Logo';

const Login = () => {
  return (
    <div className="font-[DM_Sans] bg-green-800 w-screen h-screen flex items-center">
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
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <div className="mb-4 mr-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email"
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
                    />
                  </div>
                </div>
                <div className="mb-6 text-center mt-8">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Login
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
                    Non hai un account? Registrati!
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

export default Login;