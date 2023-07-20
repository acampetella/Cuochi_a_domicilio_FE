import React from "react";
import AnimatedImage from "./AnimatedImage";
import { foodImages } from "../images/foodImages";
import { nanoid } from "nanoid";
import "../styles/animationStyle.css";
import CookCard from "./CookCard";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import { useState, useEffect } from "react";

const Animation = () => {
  const [availableCooks, setAvailableCooks] = useState([]);

  const getAvailableCooks = async () => {
    let myToast;
    try {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cooks/available`
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        return response.cooks;
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
    getAvailableCooks().then((result) => {
      setAvailableCooks(result);
    });
  }, []);

  return (
    <div className="w-screen p-2 realtive">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full flex gap-2 flex-wrap justify-center my-2">
        {foodImages.map((image) => {
          return (
            <div key={nanoid()}>
              <AnimatedImage src={image.path} />
            </div>
          );
        })}
      </div>
      <div className="banner-style">
        <h1 className="font-[Pacifico] text-center">Cuochi a Domicilio</h1>
        <h4 className="text-center">Il ristorante a casa tua</h4>
      </div>
      <h4 className="text-center font-bold text-4xl">I nostri cuochi</h4>
      <div className="flex justify-center">
        <div className="flex mt-1">
          {availableCooks &&
            availableCooks.map((cook) => {
              return <CookCard key={nanoid()} cook={cook} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Animation;
