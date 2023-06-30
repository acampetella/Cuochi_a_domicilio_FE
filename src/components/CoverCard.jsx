import React from 'react';
import ButtonFileLoader from './ButtonFileLoader';
import {MdAddAPhoto} from "react-icons/md";
import { useSelector } from 'react-redux';
import { selectedFileURL } from '../reducers/buttonSelectedFileReducer';

const CoverCard = () => {

  const url = useSelector(selectedFileURL);

  return (
    <div className='bg-slate-200 border-8 border-slate-300 shadow-lg rounded-md w-3/5 xl:h-3/5 lg:h-2/5 h-1/5 relative'>
        { url && <img src={url} alt="Cover Image" className='w-full h-full absolute top-0 left-0' />}
        <ButtonFileLoader icon={<MdAddAPhoto size={30}/>} formats={["image/png", "image/jpeg"]}/>
    </div>
  )
}

export default CoverCard