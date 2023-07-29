import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="NavbarContainer">
        <div className="NavbarPageName">Task Manager</div>
        <div className="NavbarValues"> 
            <p>Dashboard</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
