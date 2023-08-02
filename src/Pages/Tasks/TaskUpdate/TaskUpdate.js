import React, { useContext, useState } from "react";
import "../../Dashboard/Dashboard.css";
import "./TaskUpdate.css";
import "../TaskAdd/TaskAdd.css";
import SideMenu from "../../../Components/SideMenu/SideMenu";
import TopBar from "../../../Components/TopBar/TopBar";
import { AllContext } from "../../../Context/Context";

const TaskUpdate = () => {
  const { allModels } = useContext(AllContext);
  const [modelColor, setModelColour] = useState([]);
  const getDate = new Date();
  const [formDetail, setFormDetail] = useState({
    Job_No: "",
    Model: "",
    Colour: "",
    Metal_Code: "",
    Fab_ID: "",
    Status_Allocated: "",
    Message: "",
    Price: "",
    Date: getDate.toISOString().substring(0, 10),
  });

  const ModelColorSelect = async (value) => {
    // eslint-disable-next-line array-callback-return
    allModels.map((value1) => {
      if (value1.Name === value) setModelColour(value1.Colour);
    });
  };

  const formDataUpdate = async (e) => {
    setFormDetail({ ...formDetail, [e.target?.name]: e.target?.value });
  };

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="TaskUpdateContainer">
            <div className="FormDisplay">
              <div className="TaskAddDetail">
                <p
                  style={{
                    fontSize: "x-larger",
                    fontWeight: "600",
                    color: "#0077b6",
                  }}
                >
                  Update Task
                </p>
                {/* <p>Date</p> */}
                <input
                  type="date"
                  name="Date"
                  id=""
                  value={formDetail.Date}
                  onChange={formDataUpdate}
                  style={{ outline: "none" }}
                />
              </div>
              <div className="TaskInput">
                <div className="TaskDetail">
                  <label htmlFor="Job_No">Job No : </label>
                  <input
                    type="number"
                    name="Job_No"
                    id="Job_No"
                    placeholder="4444444444444"
                    onChange={formDataUpdate}
                  />
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Model">Model : </label>
                  <select
                    name="Model"
                    id="Model"
                    onChange={(e) => {
                      ModelColorSelect(e?.target?.value);
                      formDataUpdate(e);
                    }}
                  >
                    <option value="">Select Model</option>
                    {allModels.map((value) => {
                      return <option value={value.Name}>{value.Name}</option>;
                    })}
                  </select>
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Colour">Colour : </label>
                  <select name="Colour" id="Colour" onChange={formDataUpdate}>
                    <option value="">Select Colour</option>
                    {modelColor?.map((value) => {
                      return <option value={value}>{value}</option>;
                    })}
                  </select>
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Metal_Code">Metal Code : </label>
                  <input
                    type="text"
                    name="Metal_Code"
                    id="Metal_Code"
                    placeholder=""
                    onChange={formDataUpdate}
                  />
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Fab_ID">Fab_ID : </label>
                  <input
                    type="text"
                    name="Fab_ID"
                    id="Fab_ID"
                    placeholder=""
                    onChange={formDataUpdate}
                  />
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Status_Allocated">Status Allocated : </label>
                  <select
                    name="Status_Allocated"
                    id="Status_Allocated"
                    onChange={formDataUpdate}
                  >
                    <option value="">Select Model</option>
                    <option value="Service Center">Service Center</option>
                    <option value="Vender">Vender</option>
                    <option value="Owner">Owner</option>
                    <option value="Engineer">Engineer</option>
                    <option value="RMA">RMA</option>
                  </select>
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Price">Price : </label>
                  <input
                    type="number"
                    name="Price"
                    id="Price"
                    placeholder=""
                    onChange={formDataUpdate}
                  />
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Message">Message : </label>
                  <textarea
                    name="Message"
                    id="Message"
                    cols="10"
                    rows="1"
                    onChange={formDataUpdate}
                  ></textarea>
                </div>
                <button
                  className="button-23"
                  style={{ marginTop: "20px" }}
                  onClick={() => {}}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="StatusDisplay">
              <span>
                <p>Time -</p>
                <p style={{}}>Status</p>
              </span>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdate;
