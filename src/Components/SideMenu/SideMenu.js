import React, { useContext } from "react";
import "./SideMenu.css";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { BiMobileAlt } from "react-icons/bi";
import { MdEngineering } from "react-icons/md";
import { Link } from "react-router-dom";
import { AllContext } from "../../Context/Context";

const SideMenu = () => {
  const { setPage, page, role } = useContext(AllContext);
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
            style={page === "Home" ? { color: "#000000" } : {}}
            onClick={() => {
              setPage("Home");
            }}
          >
            <HiOutlineHome className="SideMenuIcons" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/tasks">
          <div
            className="SideOptions"
            style={page === "Tasks" ? { color: "#000000" } : {}}
            onClick={() => {
              setPage("Tasks");
            }}
          >
            <FaTasks className="SideMenuIcons" />
            <p>Tasks</p>
          </div>
        </Link>
        {role === "Engineer" ? null : (
          <>
            <Link to="/Mobiles">
              <div
                className="SideOptions"
                style={page === "Mobiles" ? { color: "#000000" } : {}}
                onClick={() => setPage("Mobiles")}
              >
                <BiMobileAlt className="SideMenuIcons" />
                <p>Mobiles</p>
              </div>
            </Link>
            <Link to="/Engineers">
              <div
                className="SideOptions"
                style={page === "Engineers" ? { color: "#000000" } : {}}
                onClick={() => setPage("Engineers")}
              >
                <MdEngineering className="SideMenuIcons" />
                <p>Engineers</p>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default SideMenu;
