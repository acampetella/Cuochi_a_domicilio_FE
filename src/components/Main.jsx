import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { foodImages } from "../images/foodImages";
import { nanoid } from "nanoid";

const Main = () => {
  return (
    <div className="w-full p-10">
      <Carousel autoPlay={true} infiniteLoop={true} >
        {foodImages.map((image) => {
          return (
            <div key={nanoid()}>
              <img src={image.path} className="w-full object-cover" />
              <p className="legend">Legend 1</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Main;
