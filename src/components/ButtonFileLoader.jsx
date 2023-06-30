import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../reducers/buttonSelectedFileReducer';

const ButtonFileLoader = ({icon, formats}) => {

    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
      };

      const handleChange = (event) => {
        const file = event.target.files[0].name;
        dispatch(setSelectedFile(file));
      };

      const getFormats = () => {
        return formats.join(',');
      };

  return (
    <div>
        <button className='absolute bottom-1 right-1' onClick={handleClick}>
            {icon}
        </button>
        <input 
            type="file" 
            ref={hiddenFileInput} 
            onChange={handleChange}
            accept={getFormats()}
            className='hidden' 
        />
    </div>
  )
}

export default ButtonFileLoader