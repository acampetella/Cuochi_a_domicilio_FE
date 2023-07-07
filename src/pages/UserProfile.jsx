import React from "react";
import CoverCard from "../components/CoverCard";
import { useEffect, useState } from "react";
import getDecodeSession from "../utilities/token/decodeSession";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setInitialUser,
  userChange,
  user,
  initialUser,
  setUserChange,
} from "../reducers/userReducer";
import UserInfo from "../components/UserInfo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { checkUserChange } from "../utilities/validations/userChangeValidation";
import { imageUpload } from "../utilities/fileManagers/imageUpload";
import getAccessKey from "../utilities/token/accessKey";
import { Toaster } from "react-hot-toast";
import { Toast } from "../utilities/notifications/toast";
import Loader from "../components/Loader";
import { coverImage } from "../reducers/coverUploadReducer";
import { avatarImage } from "../reducers/avatarUploadReducer";

const UserProfile = () => {
  const dispatch = useDispatch();
  const change = useSelector(userChange);
  let actualUser = useSelector(user);
  let oldUser = useSelector(initialUser);
  const coverImg = useSelector(coverImage);
  const avatarImg = useSelector(avatarImage);
  const [isLoading, setIsLoading] = useState(false);

  const saveFunction = async () => {
    let newUser = { ...actualUser };
    const token = getAccessKey();
    let myToast;
    try {
      setIsLoading(true);
      if (coverImg !== null) {
        const coverUploaded = await imageUpload(
          coverImg,
          `${process.env.REACT_APP_SERVER_BASE_URL}/internal/coverUpload`,
          "img",
          token
        );
        if (coverUploaded !== undefined) {
          newUser = { ...newUser, cover: coverUploaded.img };
        } else {
          setIsLoading(false);
          myToast = new Toast("Operation failed: cover upload error");
          myToast.notifyError();
        }
      }
      if (avatarImg !== null) {
        const avatarUploaded = await imageUpload(
          avatarImg,
          `${process.env.REACT_APP_SERVER_BASE_URL}/internal/avatarUpload`,
          "img",
          token
        );
        if (avatarUploaded !== undefined) {
          newUser = { ...newUser, avatar: avatarUploaded.img };
        } else {
          setIsLoading(false);
          myToast = new Toast("Operation failed: avatar upload error");
          myToast.notifyError();
        }
      }
      const session = getDecodeSession();
      const userId = session.id;
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify(newUser),
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          }
        }
      );
      const response = await data.json();
      if (response.statusCode === 200) {
        const data2 = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/getNewToken`,
          {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            }
          }
        );
        const response2 = await data2.json();
        if (response2.statusCode === 200) {
          const newToken = response2.newToken;
          localStorage.clear();
          localStorage.setItem("session", newToken);
          actualUser = { ...newUser };
          oldUser = { ...newUser };
          dispatch(setUserChange(false));
          setIsLoading(false);
          myToast = new Toast("Operation successfully completed");
          myToast.notifyMessage();
        } else {
          setIsLoading(false);
          const errorMessage = `statusCode: ${response.statusCode}, message: ${response.message}`;
          myToast = new Toast(errorMessage);
          myToast.notifyError();
        }
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
  };

  useEffect(() => {
    if (!actualUser) {
      const session = getDecodeSession();
      dispatch(setUser(session));
      dispatch(setInitialUser(session));
    }
    if (actualUser && oldUser) {
      const check = checkUserChange(actualUser, oldUser);
      dispatch(setUserChange(check));
    }
  }, [dispatch, actualUser]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      <Navbar/>
      <div className="w-screen h-screen flex flex-col items-center pt-10 bg-slate-50">
        <CoverCard />
        <UserInfo />
        <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium flex justify-center items-center">
          <button
            className="xl:w-[220px] lg:w-[200px] md:w-[180px] w-[160px] px-4 py-2 my-2 lg:font-bold font-normal text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={!change}
            onClick={saveFunction}
          >
            Salva
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
