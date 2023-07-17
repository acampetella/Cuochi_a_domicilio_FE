import React from 'react';

const AnimatedImage = ({src, alt = 'animated image'}) => {

  return (
    <div className='w-[350px] h-[300px]'>
        <img src={src} alt={alt} className='w-full h-full object-cover' />
    </div>
  )
}

export default AnimatedImage