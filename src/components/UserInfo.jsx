import React from 'react';
import { useSelector } from 'react-redux';
import { user } from '../reducers/userReducer';
import { nanoid } from 'nanoid';

const UserInfo = () => {

    const actualUser = useSelector(user);

    const getReverseDate = () => {
        if (actualUser.birthDate) {
            const arr = actualUser.birthDate.split('-').reverse();
            return arr.join('-');
        }
        return actualUser.birthDate;
    }

  return (actualUser &&
    <div 
        className='bg-slate-100 rounded-lg w-3/5 relative xl:mt-12 lg:mt-10 md:mt-8 mt-4'    
    >
        <div 
            className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-5xl md:text-3xl text-xl font-black'
        >
            {`${actualUser.firstName} ${actualUser.lastName}`}
        </div>
        <div 
            className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium'
        >
            {`Data di nascita: ${getReverseDate()}`}
        </div>
        <div 
            className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium'
        >
            {`Email: ${actualUser.email}`}
        </div>
        <div 
            className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium'
        >
            {"Contatti telefonici:"}
            <ul>
                {actualUser.phones && actualUser.phones.map((phone) => <li key={nanoid()}>{`${phone}`}</li>)}
            </ul>
        </div>
        <div 
            className='xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium flex justify-center'
        >
            <button
                className="xl:w-[250px] md:w-[230px] w-[200px] px-4 py-2 my-2 mr-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Nuovo contatto
            </button>
            <button
                className="xl:w-[250px] md:w-[230px] w-[200px] px-4 py-2 my-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Modifica info
            </button>
        </div>
    </div>
  )
}

export default UserInfo