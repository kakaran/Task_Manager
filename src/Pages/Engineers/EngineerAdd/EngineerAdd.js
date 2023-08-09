import React, { useContext, useState } from "react";
import TopBar from "../../../Components/TopBar/TopBar";
import SideMenu from "../../../Components/SideMenu/SideMenu";
import "../../Dashboard/Dashboard.css";
import "../../Tasks/Task.css";
import axios from "axios";
import { AllContext } from "../../../Context/Context";

const EngineerAdd = () => {
  const [formDetail, setFormDetail] = useState({
    FName: "",
    LName: "",
    Email: "",
    PhoneNo: "",
    Password: "",
  });
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { NotificationMethod } = useContext(AllContext);
  const [emailVerify, setEmailVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);

  const formDataUpdate = async (e) => {
    setFormDetail({ ...formDetail, [e.target?.name]: e.target?.value });
  };

  const Emailcheck = () => {
    // Email Check Syntax is correct or not
    if (formDetail.Email) {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i?.test(formDetail.Email)) {
        return setEmailVerify(true);
      } else {
        return setEmailVerify(false);
      }
    }
  };

  const PasswordCheck = () => {
    // Password Check Syntax is correct or not
    if (formDetail.Password) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/?.test(
          formDetail.Password
        )
      ) {
        return setPasswordVerify(true);
      } else return setPasswordVerify(false);
    }
  };

  const EngineerAdd = async () => {
    try {
      const { FName, LName, Password, Email, PhoneNo } = formDetail;
        
      const Response =( await axios.post(`${BASE_URL}/api/CreateAcount`, {
        FName,
        LName,
        Password,
        Email,
        PhoneNo,
      })).data

      if (Response.status) {
        NotificationMethod(Response.message, Response.status);
      }
      // console.log(axios.error.code);

      console.log(Response.response);
    } catch (error) {
      console.log(error.response.data.message);
      NotificationMethod(error.response.data.message)
    }
  };

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="TaskAddContainer" style={{ height: "auto" }}>
            <div className="TaskInput">
              <div className="TaskDetail">
                <label htmlFor="FName">First Name : </label>
                <input
                  type="text"
                  name="FName"
                  id="FName"
                  placeholder="First Name"
                  onChange={formDataUpdate}
                />
              </div>
              <div className="TaskDetail">
                <label htmlFor="LName">Last Name : </label>
                <input
                  type="text"
                  name="LName"
                  id="LName"
                  placeholder="Last Name"
                  onChange={formDataUpdate}
                />
              </div>
            </div>
            <div className="TaskInput">
              <div className="TaskDetail">
                <label htmlFor="Email">Email : </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Email"
                  onChange={(e) => {
                    formDataUpdate(e);
                    Emailcheck();
                  }}
                  style={
                    !emailVerify
                      ? { outlineColor: "red" }
                      : { outlineColor: "#0077bd" }
                  }
                />
              </div>
              <div className="TaskDetail">
                <label htmlFor="PhoneNo">Mobile No : </label>
                <input
                  type="number"
                  name="PhoneNo"
                  id="PhoneNo"
                  placeholder="Mobile Number "
                  onChange={formDataUpdate}
                />
              </div>
            </div>
            <div className="TaskInput">
              <div className="TaskDetail">
                <label htmlFor="Password">Password : </label>
                <input
                  type="text"
                  name="Password"
                  id="Password"
                  placeholder="Password"
                  onChange={(e) => {
                    formDataUpdate(e);
                    PasswordCheck();
                  }}
                  style={
                    !passwordVerify
                      ? { outlineColor: "red" }
                      : { outlineColor: "#0077bd" }
                  }
                />
                <ul
                  style={
                    !formDetail.Password
                      ? { display: "none" }
                      : {
                          display: "block",
                          listStyleType: "disc",
                          padding: "15px",
                        }
                  }
                >
                  <li>a minimum of 1 lower case letter [a-z] and</li>
                  <li>a minimum of 1 upper case letter [A-Z] and</li>
                  <li>a minimum of 1 numeric character [0-9] and</li>
                  <li>a minimum of 1 special character: [!@#$%&]</li>
                  <li>
                    Passwords must be at least 10 characters in length, but can
                    be much longer.
                  </li>
                </ul>
              </div>
              <div className="TaskDetail"></div>
            </div>
            <div
              className="TaskInput"
              style={{ justifyContent: "end", marginTop: "50px" }}
            >
              <button
                className="button-23"
                onClick={() => {
                  EngineerAdd();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerAdd;
