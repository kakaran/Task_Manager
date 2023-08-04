import React, { useState } from "react";
import "./SideMenu.css";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { BiMobileAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [active, setActive] = useState("Home");
  return (
    <>
      <div className="SideMenuContainer">
        <div className="SideOption">
          <AiTwotoneThunderbolt className="SideMenuIcon" fill="#a763f4  " />
          <p>Task Manager</p>
        </div>
        <Link to="/home">
          <div
            className="SideOptions"
            style={active.current === "Home" ? { color: "#000000" } : {}}
            onClick={() => setActive("Home")}
          >
            <HiOutlineHome className="SideMenuIcons" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/tasks">
          <div
            className="SideOptions"
            style={active.current === "Tasks" ? { color: "#000000" } : {}}
            onClick={() => setActive("Tasks")}
          >
            <FaTasks className="SideMenuIcons" />
            <p>Tasks</p>
          </div>
        </Link>
        <Link to="/Mobiles">
          <div
            className="SideOptions"
            style={active.current === "Tasks" ? { color: "#000000" } : {}}
            onClick={() => setActive("Tasks")}
          >
            <BiMobileAlt className="SideMenuIcons" />
            <p>Mobiles</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SideMenu;
