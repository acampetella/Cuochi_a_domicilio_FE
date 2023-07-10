import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ menusList, linksList }) => {
  const [hidden, setHidden] = useState(true);
  const [className, setClassName] = useState("hidden");

  const toggleFunction = () => {
    setHidden(!hidden);
   
  };

  useEffect(() => {
    if (hidden) {
        setClassName("hidden");
    } else {
        setClassName("block");
    }
  }, [hidden]);

  return (
    <div className="relative">
      {hidden && <div>
        <button onClick={toggleFunction}>
          <GiHamburgerMenu size={30} />
        </button>
      </div>}
      {!hidden && <div>
        <button onClick={toggleFunction}>
          <MdRestaurantMenu size={30} />
        </button>
      </div>}
      <div className={className}>
        <ul className="absolute top-10 right-2 text-black bg-green-700 w-20 rounded-md px-3 py-2">
          {menusList.map((element, index) => {
            return (
              <li key={nanoid()} onClick={toggleFunction}>
                <Link to={linksList[index]}>{element}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
