import React from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, user, initialUser, setUserChange } from '../reducers/userReducer';
import { checkUserChange } from '../utilities/validations/userChangeValidation';

const ButtonCoverLoader = ({icon, formats}) => {

    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);
    const actualUser = useSelector(user);
    const myInitialUser = useSelector(initialUser);

    const handleClick = () => {
        hiddenFileInput.current.click();
      };

    const handleChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        const newUser = {...actualUser, cover: url};
        dispatch(setUser(newUser));
        dispatch(setUserChange(true));
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