import React from "react";
import { useNavigate } from "react-router";

const FooterItems = ({ link, icon, title,mode }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`text-center ${
        mode
          ? "text-slate-400 hover:text-white"
          : "text-slate-500 hover:text-black"
      }  cursor-pointer`}
      onClick={() => navigate(`/${link}`)}
    >
      <i className={`fi fi-rr-${icon}`}></i>
      <h1 className="text-[12px] font-Poppins font-medium">{title}</h1>
    </div>
  );
};

const Footer = ({ darkMode }) => {
  return (
    <div
      className={`py-2 lg:w-1/4 flex items-center justify-evenly ${
        darkMode ? "bg-slate-700" : "bg-white"
      }  rounded-t-xl fixed bottom-0 left-0 right-0`}
    >
      <FooterItems link="home" icon="home" title="Home" mode={darkMode}/>
      <FooterItems link="customers" icon="users-alt" title="Customers" mode={darkMode}/>
      <FooterItems link="user" icon="apps" title="More" mode={darkMode}/>
    </div>
  );
};

export default Footer;
