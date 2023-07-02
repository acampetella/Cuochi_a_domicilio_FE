import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedAvatarURL, setSelectedAvatarURL } from '../reducers/buttonSelectedAvatarReducer';
import { useRef } from 'react';

const AvatarCard = ({}) => {

    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);
    const url = useSelector(selectedAvatarURL);

    const handleClick = () => {
        hiddenFileInput.current.click();
      };

    const handleChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        dispatch(setSelectedAvatarURL(url));
      }
    };

  return (
    <button 
      className='bg-slate-200 border-4 border-slate-300 shadow-lg rounded-full absolute bottom-[-20px] left-8 md:bottom-[-40px] md:left-10 xl:bottom-[-50px] xl:left-20 w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px]'
      onClick={handleClick}
    >
        { url && 
          <img 
            src={url} 
            alt="Cover Image" 
            className='w-full h-full object-cover rounded-full'
          />}
          <input 
            type="file" 
            ref={hiddenFileInput} 
            onChange={handleChange}
            accept="image/png, image/jpeg"
            className='hidden' 
            />
    </button>
  )
}

export default AvatarCard