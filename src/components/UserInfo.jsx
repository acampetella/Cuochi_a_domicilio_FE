import React from "react";
import { user, setUser } from "../reducers/userReducer";
import { phoneModalShow, setPhoneModalShow } from "../reducers/addPhoneModalReducer";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { LuEdit } from "react-icons/lu";
import { CgAddR } from "react-icons/cg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AddPhoneModal from "../components/AddPhoneModal";

const UserInfo = () => {
  const currentUser = useSelector(user);
  const dispatch = useDispatch();
  const showModal = useSelector(phoneModalShow);

  const getReverseDate = () => {
    if (currentUser.birthDate) {
      const arr = currentUser.birthDate.split("-").reverse();
      return arr.join("-");
    }
    return currentUser.birthDate;
  };

  const deletePhoneHandler = (index) => {
    const arr = [...currentUser.phones];
    arr.splice(index, 1);
    const newUser = { ...currentUser, phones: arr };
    dispatch(setUser(newUser));
  };

  const addPhoneHandler = () => {
    dispatch(setPhoneModalShow(true));
  };

  return (
    currentUser && (
      <div className="bg-slate-100 rounded-lg md:w-2/4 w-3/5 relative xl:mt-12 lg:mt-10 md:mt-8 mt-4">
        <section className="flex items-center">
          <div>
            <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-4xl md:text-2xl text-xl font-black">
              {`${currentUser.firstName} ${currentUser.lastName}`}
            </div>
            <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium">
              {`Data di nascita: ${getReverseDate()}`}
            </div>
            <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium">
              {`Email: ${currentUser.email}`}
            </div>
          </div>
          <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium">
            <Link to={"/userInfoChange"}>
              <button>
                <LuEdit className="md:text-3xl text-xl mr-1" />
              </button>
            </Link>
          </div>
        </section>
        <hr />
        <section className="flex">
          {showModal && <AddPhoneModal/>}
          <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium">
            {"Contatti telefonici:"}
            <ul>
              {currentUser &&
                currentUser.phones &&
                currentUser.phones.map((phone, index) => (
                  <li key={nanoid()}>
                    {`${phone}`}
                    <button
                      className="ml-4"
                      onClick={() => deletePhoneHandler(index)}
                    >
                      <RiDeleteBin5Line className="md:text-3xl text-xl" />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="xl:my-3 md:my-2 my-1 xl:ml-10 md:ml-8 ml-6 xl:text-2xl md:text-xl text-base font-medium">
            <Link to={""}>
              <button onClick={addPhoneHandler}>
                <CgAddR className="md:text-3xl text-xl" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    )
  );
};

export default UserInfo;
