import React from 'react';
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AnimatedImage = ({src, alt = 'animated image'}) => {

    useEffect(() => {
        AOS.init({duration: 2000});
    }, []);

  return (
    <div className='w-[350px] h-[300px]' data-aos='flip-left'>
        <img src={src} alt={alt} className='w-full h-full object-cover' />
    </div>
  )
}

export default AnimatedImage