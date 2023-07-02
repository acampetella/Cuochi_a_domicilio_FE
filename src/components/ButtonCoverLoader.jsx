import React from 'react';
import { useRef } from 'react';
import { useDispatch} from 'react-redux';
import { setSelectedCoverURL} from '../reducers/buttonSelectedCoverReducer';

const ButtonCoverLoader = ({icon, formats}) => {

    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
      };

    const handleChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        dispatch(setSelectedCoverURL(url));
      }
    };

    const getFormats = () => {
      return formats.join(',');
    };

  return (
    <div className='absolute bottom-0 right-1'>
        <button onClick={handleClick}>
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

export default ButtonCoverLoader