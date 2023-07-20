import React from "react";
import { foodImages } from "../images/foodImages";
import "../styles/infiniteSlider.css";

const InfiniteSlider = () => {
  return (
    <div className="body">
      <div className="slider">
        <div className="slider-track">
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food1.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food2.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food3.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food4.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food5.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food6.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food7.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food8.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food9.jpg" />
          </div>
          <div className="slide">
            <img src="http://localhost:5050/uploads/foodImages/food10.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
