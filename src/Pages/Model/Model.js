import React, { useContext } from "react";
import "../Dashboard/Dashboard.css";
import "../Tasks/Tasks";
import "./Model.css";
import TopBar from "../../Components/TopBar/TopBar";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../Context/Context";
import { RiDeleteBackFill } from "react-icons/ri";
import axios from "axios";

const Model = () => {
  const navigate = useNavigate();
  const { NotificationMethod, render, setRender, allModels } =
    useContext(AllContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const ModelDelete = async (_id) => {
    try {
      const Response = (
        await axios.delete(`${BASE_URL}/api/ModelDelete/${_id}`)
      ).data;
      if (Response) {
        NotificationMethod(Response.message, Response.status);
        setRender(!render);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="TaskOptions">
            <p>All Models</p>
            <div>
              <div onClick={() => navigate("/Mobiles_Add")}>
                <IoIosAdd style={{ fontSize: "20px" }} />
                <p>Add Model</p>
              </div>
            </div>
          </div>
          <div className="ModelCardContainer">
            {allModels?.map((value, index) => {
              return (
                <div className="ModelCard" key={index}>
                  <div className="flex gap-5 items-center justify-between">
                    <span>
                      Model : <p> {value.Name}</p>
                    </span>
                    <div className="">
                      <RiDeleteBackFill
                        onClick={() => {
                          ModelDelete(value._id);
                        }}
                      />
                    </div>
                  </div>
                  <span>
                    Colour :
                    {value.Colour?.map((value1, index) => {
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
