import React from "react";

// importing logo
import logo from "../../images/deimexa-logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <img src={logo} alt="logo" className="w-20" />
        <p className="text-white text-base text-center mx-2">DPKI</p>
        <p className="text-white text-base text-center mx-2">Jamolkhon</p>
        <p className="text-white text-base text-center mx-2">TP056763</p>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Application of Decentralized Private Key Infrastructure</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-center items-center mt-3">
      <p className="text-white text-center text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;