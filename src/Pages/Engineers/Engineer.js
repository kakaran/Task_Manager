import React, { useContext, useEffect, useState } from "react";
import TopBar from "../../Components/TopBar/TopBar";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "../Dashboard/Dashboard.css";
import "../Tasks/Task.css";
import "./Engineer.css";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { AllContext } from "../../Context/Context";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Engineer = () => {
  const { setPage } = useContext(AllContext);
  const navigate = useNavigate();
  const [Engineers, setEngineers] = useState([]);

  useEffect(() => {
    const GetAllEngineers = async () => {
      try {
        const Responce = (await axios.get(`${BASE_URL}/api/AllEnginersDisplay`))
          .data;
        if (Responce) setEngineers(Responce.AllUsers);
      } catch (error) {
        console.log(error);
      }
    };
    GetAllEngineers();
    setPage("Engineer");
  }, []);

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="EngineerContainer">
            <div className="TaskOptions">
              <p>All Engineers</p>
              <div>
                <div onClick={() => navigate("/engineers_Add")} className="taskFilter">
                  <IoIosAdd style={{ fontSize: "20px" }} />
                  <p>Add Engineer</p>
                </div>
              </div>
            </div>
            {!Engineers.length ? (
              <p className="text-center mt-5 text-xl font-extrabold">
                Zero Engineers
              </p>
            ) : (
              <div className="TaskCardDisplay">
                {Engineers?.map((value, index) => {
                  return (
                    <div className="CardContainer" key={index}>
                      <span>
                        Name :<p>{value.FName + " " + value.LName} </p>
                      </span>
                      <span>
                        Email :<p> {value.Email}</p>
                      </span>
                      <span>
                        Phone No :<p> {value.PhoneNo}</p>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineer;
