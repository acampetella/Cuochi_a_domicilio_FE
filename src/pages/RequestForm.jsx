import React from "react";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import getAccessKey from "../utilities/token/accessKey";
import getDecodeSession from "../utilities/token/decodeSession";
import Loader from "../components/Loader";

const RequestForm = () => {
  const formDataInitialValue = {
    user: "",
    cook: "",
    date: "",
    from: "",
    to: "",
    menu: "",
    state: "sent",
    owner: "cook",
  };

  const placeInitialValue = {
    street: "",
    town: "",
    province: "",
    zipCode: "",
  };

  const token = getAccessKey();
  const session = getDecodeSession();
  const [cook, setCook] = useState(null);
  const [formData, setFormData] = useState(formDataInitialValue);
  const [place, setPlace] = useState(placeInitialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [menuSelected, setMenuSelected] = useState("");
  const { cookId } = useParams();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePlaceChange = (event) => {
    setPlace((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleMenuChange = (event) => {
    setMenuSelected(event.target.value);
  };

  const saveRequest = async () => {
    let myToast;
    if (checkInput()) {
      let menu;
      if (cook.menus && cook.menus.length > 0 && menuSelected === "") {
        menu = cook.menus[0]._id;
      } else {
        menu = menuSelected;
      }
      const bodyContent = {
        ...formData,
        user: session.id,
        cook: cook.user._id,
        place: place,
        menu: menu,
      };
      console.log(bodyContent);
      setIsLoading(true);
      try {
        const data = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/requests`,
          {
            method: "POST",
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyContent),
          }
        );
        const response = await data.json();
        if (response.statusCode === 201) {
          setIsLoading(false);
          myToast = new Toast("Request sends successfully");
          myToast.notifyMessage();
          resetFields();
        } else {
          setIsLoading(false);
          const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
          myToast = new Toast(errorMessage);
          myToast.notifyError();
        }
      } catch (error) {
        setIsLoading(false);
        myToast = new Toast(error.toString());
        myToast.notifyError();
      }
    } else {
      myToast = new Toast("Devi compilare i campi obbligatori (*)");
      myToast.notifyError();
    }
  };

  const checkInput = () => {
    if (
      formData.date === "" ||
      formData.from === "" ||
      formData.to === "" ||
      place.street === "" ||
      place.town === "" ||
      place.province === "" ||
      place.zipCode === ""
    ) {
      return false;
    }
    return true;
  };

  const resetFields = () => {
    setFormData(formDataInitialValue);
    setPlace(placeInitialValue);
    setMenuSelected("");
  };

  const getCookData = async () => {
    let myToast;
    try {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cooks/${cookId}`
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        return response.cookExists;
      } else {
        const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
        myToast = new Toast(errorMessage);
        myToast.notifyError();
      }
    } catch (error) {
      myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };

  useEffect(() => {
    getCookData().then((response) => {
      setCook(response);
    });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
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
                    {cook && cook.user && (
                      <input
                        type="text"
                        name="cook"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={`${cook.user.firstName} ${cook.user.lastName}`}
                      />
                    )}
                  </div>
                  <div className="md:col-span-5">
                    <label>*Data</label>
                    <input
                      type="date"
                      name="date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-6">
                    <label className="mr-2">*Dalle</label>
                    <input
                      type="time"
                      name="from"
                      className="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50"
                      value={formData.from}
                      onChange={handleChange}
                    />
                    <label className="mx-2">*Alle</label>
                    <input
                      type="time"
                      name="to"
                      className="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50"
                      value={formData.to}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label>*Indirizzo / Via</label>
                    <input
                      type="text"
                      name="street"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={place.street}
                      onChange={handlePlaceChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>*Città</label>
                    <input
                      type="text"
                      name="town"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={place.town}
                      onChange={handlePlaceChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label>*Provincia</label>
                    <input
                      type="text"
                      name="province"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={place.province}
                      onChange={handlePlaceChange}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label>*CAP</label>
                    <input
                      type="text"
                      name="zipCode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={place.zipCode}
                      onChange={handlePlaceChange}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label>Menu</label>
                    <select
                      onChange={handleMenuChange}
                      value={menuSelected}
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      {cook &&
                        cook.menus &&
                        cook.menus.map((menu) => {
                          return (
                            <option key={nanoid()} value={menu._id}>
                              {menu.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        onClick={saveRequest}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Invia
                      </button>
                      <a href="/" className="underline text-xl text-indigo-600 ml-2">
                        Home
                      </a>
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
