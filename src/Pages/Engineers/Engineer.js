import React from "react";
import TopBar from "../../Components/TopBar/TopBar";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "../Dashboard/Dashboard.css";
import "../Tasks/Task.css";
import "./Engineer.css"
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const Engineer = () => {
  const navigate = useNavigate();
  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="EngineerContainer">
            <div className="TaskOptions">
              <p>All Engineers</p>
              <div onClick={() => navigate("/task_Add")}>
                <IoIosAdd style={{ fontSize: "20px" }} />
                <p>Add Engineer</p>
              </div>
            </div>
            <div className="TaskCardDisplay">

                <div className="CardContainer">

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineer;
