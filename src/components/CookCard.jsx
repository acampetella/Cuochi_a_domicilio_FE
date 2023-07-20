import React from 'react';
import { Link } from 'react-router-dom';

const CookCard = ({cook}) => {

    const getTowns = () => {
        const towns = cook.towns;
        let str = "";
        for(let i = 0; i < towns.length; i++) {
            str += towns[i];
            if (i < towns.length - 1) {
                str += ',';
            }
        }
        return str;
    };

  return (
    <Link to={`/cookPublicProfile/${cook._id}`}>
    <div className="flex items-center justify-center w-[350px] h-full mx-1 my-1">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="w-full mx-auto">
          <div
            className="w-full"
          >
            <img src={cook.user.avatar} alt="Course Image" className="w-full object-cover bg-center" />
          </div>
          <div className="p-4 sm:p-6">
            <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
              {`${cook.user.firstName} ${cook.user.lastName}`}
            </p>
            <p className="text-[#7C7C80] font-[15px] mt-6">
              {getTowns()}
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default CookCard;