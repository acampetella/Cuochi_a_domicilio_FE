import React from "react";
import { nanoid } from "nanoid";

const RequestForm = ({cook}) => {


  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 min-h-[500px]">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Nuova Richiesta</p>
                <p>Si prega di compilare i campi obbligatori (*)</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label>*Cuoco</label>
                    <input
                      type="text"
                      name="cook"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={`${cook.firstName} ${cook.lastName}`}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label>*Data</label>
                    <input
                      type="date"
                      name="date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="mr-2">*Dalle</label>
                    <input
                      type="time"
                      name="from"
                      className="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50"
                    />
                    <label className="mx-2">*Alle</label>
                    <input
                      type="time"
                      name="to"
                      className="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label>*Indirizzo / Via</label>
                    <input
                      type="text"
                      name="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>*Città</label>
                    <input
                      type="text"
                      name="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>*Provincia</label>
                    <input
                      type="text"
                      name="province"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  
                  <div className="md:col-span-1">
                    <label>*CAP</label>
                    <input
                      type="text"
                      name="zipCode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label>Menu</label>
                    <select
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      {cook && cook.menus && cook.menus.map((menu) => {
                        return (<option key={nanoid()} value={menu.name}>{menu.name}</option>)
                      })}
                    </select>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Invia
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
