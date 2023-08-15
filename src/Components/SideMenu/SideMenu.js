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
  const { setPage, page, role, permission } = useContext(AllContext);
  return (
    <>
      <div className="SideMenuContainer">
        <div className="SideOption">
          <AiTwotoneThunderbolt className="SideMenuIcon" fill="#a763f4  " />

          <p className={`${permission ? "hidden" : "block"}`}>Task Manager</p>
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
            <p className={`${permission ? "hidden" : "block"}`}>Home</p>
          </div>
        </Link>
        <Link to="/tasks">
          <div
            className="SideOptions"
            style={page === "Task" ? { color: "#000000" } : {}}
            onClick={() => {
              setPage("Task");
            }}
          >
            <FaTasks className="SideMenuIcons" />
            <p className={`${permission ? "hidden" : "block"}`}>Tasks</p>
          </div>
        </Link>
        {role === "Engineer" ? null : (
          <>
            <Link to="/Mobiles">
              <div
                className="SideOptions"
                style={page === "Mobile" ? { color: "#000000" } : {}}
                onClick={() => setPage("Mobile")}
              >
                <BiMobileAlt className="SideMenuIcons" />
                <p className={`${permission ? "hidden" : "block"}`}>Mobiles</p>
              </div>
            </Link>
            <Link to="/Engineers">
              <div
                className="SideOptions"
                style={page === "Engineer" ? { color: "#000000" } : {}}
                onClick={() => setPage("Engineer")}
              >
                <MdEngineering className="SideMenuIcons" />
                <p className={`${permission ? "hidden" : "block"}`}>
                  Engineers
                </p>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default SideMenu;
