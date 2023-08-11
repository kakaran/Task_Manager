/* eslint-disable no-const-assign */
import React, { useContext, useEffect, useState } from "react";
import "../../Dashboard/Dashboard.css";
import "./TaskUpdate.css";
import "../TaskAdd/TaskAdd.css";
import SideMenu from "../../../Components/SideMenu/SideMenu";
import TopBar from "../../../Components/TopBar/TopBar";
import { AllContext } from "../../../Context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const TaskUpdate = () => {
  const { allModels, setRender, render, NotificationMethod, TaskDelete, role } =
    useContext(AllContext);
  const [modelColor, setModelColour] = useState([]);
  const [formDetail, setFormDetail] = useState({
    Job_No: "",
    Model: "",
    Colour: "",
    Metal_Code: "",
    Fab_ID: "",
    Status: "",
    Message: "",
    Price: "",
    Date: "",
  });
  const [statusHistory, setStatusHistory] = useState();
  const { id } = useParams("id");
  const [CheckValidation, setCheckValidation] = useState(false);

  const ModelColorSelect = async (value) => {
    // eslint-disable-next-line array-callback-return
    allModels?.map((value1) => {
      if (value1.Name === value) setModelColour(value1.Colour);
    });
  };

  useEffect(() => {
    const SingleTaskDataGet = async () => {
      try {
        const Response = (
          await axios.get(`${BASE_URL}/api/SingleTaskDataGet/${id}`)
        ).data;

        const lastStatus = Response.GetData.Status_Allocated_Message.length - 1;
        if (Response);
        // eslint-disable-next-line no-lone-blocks
        {
          setFormDetail({
            Job_No: Response.GetData.Job_No,
            Model: Response.GetData.Model,
            Colour: Response.GetData.Colour,
            Metal_Code: Response.GetData.Metal_Code,
            Fab_ID: Response.GetData.Fab_ID,
            Status:
              Response.GetData.Status_Allocated_Message[lastStatus]?.Status,
            Message:
              Response.GetData.Status_Allocated_Message[lastStatus]?.Message,
            Price: Response.GetData.Price,
            Date: Response.GetData.Date,
          });
          setStatusHistory(Response.GetData.Status_Allocated_Message);
          ModelColorSelect(Response.GetData.Model);
        }
        setCheckValidation(role === "Admin" ? false : true);
      } catch (error) {
        console.log(error);
      }
    };
    SingleTaskDataGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, render, role]);

  const formDataUpdate = async (e) => {
    setFormDetail({ ...formDetail, [e.target?.name]: e.target?.value });
  };

  const TaskUpdate = async () => {
    try {
      let Response = null;
      // eslint-disable-next-line no-lone-blocks
      {
        role === "Admin"
          ? (Response = (
              await axios.post(`${BASE_URL}/api/TaskUpdate/${id}`, {
                Job_No: formDetail.Job_No,
                Model: formDetail.Model,
                Colour: formDetail.Colour,
                Metal_Code: formDetail.Metal_Code,
                Fab_ID: formDetail.Fab_ID,
                Status: formDetail.Status,
                Message: formDetail.Message,
                Price: formDetail.Price,
                Date: formDetail.Date,
              })
            ).data)
          : (Response = await axios.post(`${BASE_URL}/api/TaskUpdate/${id}`, {
              Status: formDetail.Status,
            }).data);
      }
      setRender(!render);
      if (Response) NotificationMethod(Response.message, Response.status);
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
                  disabled={CheckValidation}
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
                    value={formDetail.Job_No}
                    onChange={formDataUpdate}
                    disabled={CheckValidation}
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
                    value={formDetail.Model}
                    disabled={CheckValidation}
                  >
                    <option value="">Select Model</option>
                    {allModels?.map((value, index) => {
                      return (
                        <option value={value.Name} key={index}>
                          {value.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Colour">Colour : </label>
                  <select
                    name="Colour"
                    id="Colour"
                    onChange={formDataUpdate}
                    value={formDetail.Colour}
                    disabled={CheckValidation}
                  >
                    <option value="">Select Colour</option>
                    {modelColor?.map((value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
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
                    value={formDetail.Metal_Code}
                    disabled={CheckValidation}
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
                    value={formDetail.Fab_ID}
                    disabled={CheckValidation}
                  />
                </div>
                <div className="TaskDetail">
                  <label htmlFor="Status">Status Allocated : </label>
                  <select
                    name="Status"
                    id="Status"
                    onChange={formDataUpdate}
                    value={formDetail.Status}
                  >
                    <option value="">Select Model</option>
                    {role === "Engineer" ? null : (
                      <>
                        <option value="Service Center">Service Center</option>
                        <option value="Vender">Vender</option>
                        <option value="Owner">Owner</option>
                      </>
                    )}

                    <option value="Engineer">Engineer</option>
                    <option value="RMA">RMA</option>
                  </select>
                </div>
                {role === "Engineer" ? null : (
                  <div className="TaskDetail">
                    <label htmlFor="Price">Price : </label>
                    <input
                      type="number"
                      name="Price"
                      id="Price"
                      placeholder=""
                      onChange={formDataUpdate}
                      value={formDetail.Price}
                    />
                  </div>
                )}

                <div className="TaskDetail">
                  <label htmlFor="Message">Message : </label>
                  <textarea
                    name="Message"
                    id="Message"
                    cols="10"
                    rows="1"
                    onChange={formDataUpdate}
                    value={formDetail.Message}
                    disabled={CheckValidation}
                  ></textarea>
                </div>

                <div style={{ display: "flex", width: "100%", gap: "15px" }}>
                  <button
                    className="button-23"
                    style={{ marginTop: "20px", width: "100%" }}
                    onClick={() => {
                      TaskUpdate();
                    }}
                  >
                    Submit
                  </button>
                  {role === "Engineer" ? null : (
                    <button
                      className="button-23"
                      style={{ marginTop: "20px", width: "100%" }}
                      onClick={() => {
                        TaskDelete(id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="StatusDisplay">
              {statusHistory?.map((value, index) => {
                const Date = value.Time.substring(0, 10);
                const Time = value.Time.substring(12, 19);
                return (
                  <div className="StatusDisplay_history">
                    <span>
                      <p>{Date + "/" + Time} - </p>
                      <p
                        style={{
                          backgroundColor: "#f9f9f9",
                          padding: "10px",
                          borderRadius: "10px",
                          marginLeft: "5px",
                        }}
                      >
                        {value.Status}
                      </p>
                    </span>
                    <p className="text-center w-[280px]">{value.Message}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdate;
