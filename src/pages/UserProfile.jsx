import React from 'react';
import CoverCard from '../components/CoverCard';
import { useEffect } from 'react';
import getDecodeSession from '../utilities/token/decodeSession';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setInitialUser, userChange } from '../reducers/userReducer';
import UserInfo from '../components/UserInfo';

const UserProfile = () => {

  const dispatch = useDispatch();
  const change = useSelector(userChange);
  console.log(change);

  useEffect(() => {
    const session = getDecodeSession();
    dispatch(setUser(session));
    dispatch(setInitialUser(session));
  }, [dispatch]);

  return (
    <div className='w-screen h-screen flex flex-col items-center pt-10 bg-slate-50'>
      <CoverCard/>
      <UserInfo/>
      <div 
            className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium flex justify-center'
        >
            <button
                className="xl:w-[250px] md:w-[230px] w-[200px] px-4 py-2 my-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!change}
            >
                Salva
            </button>
        </div>
    </div>
  )
}

export default UserProfile