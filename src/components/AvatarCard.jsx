import React from 'react';
import { useRef } from 'react';
import "../styles/avatarCardStyle.css";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, user } from '../reducers/userReducer';
import { setAvatarImage } from '../reducers/avatarUploadReducer';

const AvatarCard = () => {

    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);
    const actualUser = useSelector(user);

    
    const handleClick = () => {
        hiddenFileInput.current.click();
      };

    const handleChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        dispatch(setAvatarImage(file));
        const url = URL.createObjectURL(file);
        const newUser = {...actualUser, avatar: url};
        dispatch(setUser(newUser));
      }
    };

  return (
    <button 
      className='tooltip bg-slate-200 border-4 border-slate-300 shadow-lg rounded-full absolute bottom-[-20px] left-8 md:bottom-[-40px] md:left-10 xl:bottom-[-50px] xl:left-20 w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px]'
      onClick={handleClick}
    >
        { actualUser && actualUser.avatar &&
          <img 
            src={actualUser.avatar} 
            alt="Avatar" 
            className='w-full h-full object-cover rounded-full'
          />}
          <input 
            type="file" 
            ref={hiddenFileInput} 
            onChange={handleChange}
            accept="image/png, image/jpeg"
            className='hidden' 
            />
            <span className="tooltiptext hidden w-[50px] md:w-[100px] lg:w-[150px] xl:w-[200px] py-1 md:py-2 xl:py-3 bg-slate-50 text-black text-center rounded-md absolute z-10 bottom-[-20px] left-8 md:bottom-[-40px] md:left-10 xl:bottom-[-50px] xl:left-20">Carica nuova immagine</span>
    </button>
  )
}

export default AvatarCard