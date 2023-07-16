import React from "react";
import { nanoid } from "nanoid";

const DisplayRequest = ({ request }) => {

  const reverseDate = (date) => {
    return date.split('-').reverse().join('-');
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Dettagli richiesta
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Utente</p>
            {request.user && (
              <div>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {`${request.user.firstName} ${request.user.lastName} `}
                </p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {`${request.user.email}`}
                </p>
                <div className="text-base font-medium text-navy-700 dark:text-white">
                  {request.user.phones &&
                    request.user.phones.map((phone) => {
                      return <p key={nanoid()}>{phone}</p>;
                    })}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Chef</p>
            {request.cook && (
              <div>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {`${request.cook.firstName} ${request.cook.lastName} `}
                </p>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {`${request.cook.email}`}
                </p>
                <div className="text-base font-medium text-navy-700 dark:text-white">
                  {request.cook.phones &&
                    request.cook.phones.map((phone) => {
                      return <p key={nanoid()}>{phone}</p>;
                    })}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Data</p>
            <div>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${reverseDate(request.date)}`}
              </p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${request.from} - ${request.to}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Luogo</p>
            <div>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${request.place.street}`}
              </p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${request.place.zipCode} ${request.place.town} (${request.place.province})`}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Menu selezionato</p>
            {request.menu && (
              <div>
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {`${request.menu.name} ${request.menu.price}$`}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Stato della richiesta</p>
            <div>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${request.state}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Owner</p>
            <div>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${request.owner}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayRequest;
