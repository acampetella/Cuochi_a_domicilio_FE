import React from "react";
import "../styles/cookInfoStyle.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CookInfo = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-[100vh] bg-slate-100">
        <div className="relative flex flex-col items-center rounded-[20px] w-3/5 max-w-[95%] sm:h-1/2 h-3/4 mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Una tua breve descrizione
            </h4>
            <p className="mt-2 px-2 text-base text-gray-600">
              As we live, our hearts turn colder. Cause pain is what we go
              through as we become older. We get insulted by others, lose trust
              for those others. We get back stabbed by friends. It becomes
              harder for us to give others a hand. We get our heart broken by
              people we love, even that we give them all...
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Cittò coperte</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                Roma, Latina, Rieti, Viterbo
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Link personali</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                Nessun link disponibile al momento
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <label htmlFor="toggle" className="text-xs text-gray-700">
                Online
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CookInfo;
