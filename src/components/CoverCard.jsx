import React from 'react';
import ButtonCoverLoader from './ButtonCoverLoader';
import {MdAddAPhoto} from "react-icons/md";
import AvatarCard from './AvatarCard';
import { useSelector } from 'react-redux';
import { user } from '../reducers/userReducer';


const CoverCard = () => {

  const actualUser = useSelector(user);

  return (
    <div 
      className='bg-slate-200 border-8 border-slate-300 shadow-lg rounded-md w-3/5 xl:h-3/5 lg:h-2/5 h-1/5 relative'
    >
        { actualUser && actualUser.cover &&
          <img 
            src={actualUser.cover} 
            alt="Cover Image" 
            className='w-full h-full absolute top-0 left-0 object-cover'
          />}
        <ButtonCoverLoader icon={<MdAddAPhoto size={30}/>} formats={["image/png", "image/jpeg"]}/>
        <AvatarCard/>
    </div>
  )
}

export default CoverCard