import React from 'react';
import AnimatedImage from './AnimatedImage';
import { foodImages } from '../images/foodImages';
import { nanoid } from 'nanoid';

const Animation = () => {

  return (
    <div className='w-screen p-2'>
        <div className='w-full flex gap-2 flex-wrap justify-center my-2'>
            {foodImages.map((image) => {
                return (
                    <div key={nanoid()}>
                        <AnimatedImage src={image.path}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Animation;