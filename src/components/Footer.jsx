import React from "react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="w-full h-[200px]">
      <div className=" bg-zinc-800 w-full h-[170px] text-slate-300 text-lg font-semibold flex justify-center items-center">
        <div>
          <ul>
            <li className="mb-3">
              <a href="#">Chi siamo</a>
            </li>
            <li className="mb-3">
              <a href="#">Come funziona</a>
            </li>
            <li className="mb-3">
              <a href="#">Contattaci</a>
            </li>
          </ul>
        </div>
        <div className="ms-20 flex gap-x-10">
          <a href="#">
            <TiSocialFacebook size={30} />
          </a>
          <a href="#">
            <TiSocialTwitter size={30} />
          </a>
          <a href="#">
            <TiSocialInstagram size={30} />
          </a>
        </div>
      </div>
      <div className="bg-black w-full h-[30px] text-slate-300 flex justify-center items-center">
        <span>©2023 Cuochi a domicilio - All right reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
