import React, { useContext } from "react";
import "../Dashboard/Dashboard.css";
import "../Tasks/Tasks";
import "./Model.css";
import TopBar from "../../Components/TopBar/TopBar";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../Context/Context";

const Model = () => {
  const navigate = useNavigate();
  const { allModels } = useContext(AllContext);
  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="TaskOptions">
            <p>All Models</p>
            <div onClick={() => navigate("/Mobiles_Add")}>
              <IoIosAdd style={{ fontSize: "20px" }} />
              <p>Add Model</p>
            </div>
          </div>
          <div className="ModelCardContainer">
            {allModels?.map((value, index) => {
              return (
                <div className="ModelCard" key={index}>
                  <span>
                    Model : <p> {value.Name}</p>
                  </span>
                  <span>
                    Colour :
                    {value.Colour.map((value1, index) => {
                      return (
                        <p key={index}>
                          {value1}
                          {value.Colour.length - 1 === index ? ";" : ","}
                        </p>
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
