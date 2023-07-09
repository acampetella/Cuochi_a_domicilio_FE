import React from 'react';
import UserProfile from './UserProfile';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { user } from '../reducers/userReducer';
import {cook, initialCook, cookChange } from "../reducers/cookReducer";
import { setCook, setInitialCook, setCookChange } from '../reducers/cookReducer';
import { Toast } from '../utilities/notifications/toast';
import getDecodeSession from "../utilities/token/decodeSession";

const CookProfile = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(user);
  const currentCook = useSelector(cook);
  const oldCook = useSelector(initialCook);
  const [cookSelected, setCookSelected] = useState(null);
  const token = getDecodeSession();

  const getCook = async () => {
    const userId = token.id;
    let myToast;
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/cooks/byUserId/${userId}`);
      const response = await data.json();
      if (response.statusCode === 200) {
        setCookSelected(response.cookExists);
        dispatch(setCook(cookSelected));
        dispatch(setInitialCook(cookSelected));
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
    getCook();
  }, []);

  return (
    <UserProfile/>
  );
};

export default CookProfile;