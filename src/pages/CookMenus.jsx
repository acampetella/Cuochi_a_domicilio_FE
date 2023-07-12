import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CookMenus = () => {

  return (
    <div>
        <Link to={'/addMenu'}>
            <button className='mt-3 ml-3'>
                <MdAdd className='text-4xl'/>
            </button>
        </Link>
    </div>
  )
}

export default CookMenus