import React from "react";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="py-2 lg:w-1/4 flex items-center justify-evenly border-t-2 bg-white rounded-t-xl fixed bottom-0 left-0 right-0">
      <div
        className="text-center text-slate-500 hover:text-black cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <i className="fi fi-rr-home"></i>
        <h1 className="text-[12px] font-Poppins font-medium">Home</h1>
      </div>
      <div
        className="text-center text-slate-500 hover:text-black cursor-pointer"
        onClick={() => navigate("/customers")}
      >
        <i className="fi fi-rr-users-alt"></i>
        <h1 className="text-[12px] font-Poppins font-medium">Customers</h1>
      </div>
      <div
        className="text-center text-slate-500 hover:text-black cursor-pointer"
        onClick={() => navigate("/user")}
      >
        <i className="fi fi-rr-apps"></i>
        <h1 className="text-[12px] font-Poppins font-medium">More</h1>
      </div>
    </div>
  );
};

export default Footer;
