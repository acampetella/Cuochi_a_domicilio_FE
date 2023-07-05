import React from 'react';
import CoverCard from '../components/CoverCard';
import { useEffect } from 'react';
import getDecodeSession from '../utilities/token/decodeSession';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setInitialUser, userChange } from '../reducers/userReducer';
import UserInfo from '../components/UserInfo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {

  const dispatch = useDispatch();
  const change = useSelector(userChange);

  useEffect(() => {
    const session = getDecodeSession();
    dispatch(setUser(session));
    dispatch(setInitialUser(session));
  }, [dispatch]);

  return (
    <div>
      <Navbar enableManu={false}/>
      <div className='w-screen h-screen flex flex-col items-center pt-10 bg-slate-50'>
        <CoverCard/>
        <UserInfo/>
        <div 
              className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium flex justify-center items-center'
          >
              <button
                  className="xl:w-[220px] lg:w-[200px] md:w-[180px] w-[160px] px-4 py-2 my-2 lg:font-bold font-normal text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={!change}
              >
                  Salva
              </button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UserProfile