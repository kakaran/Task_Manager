import React, { useContext, useState } from "react";
import "./Login.css";
import image from "../../Assets/Login/Login.webp";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { AllContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { setAuth,NotificationMethod } = useContext(AllContext);
  const navigate = useNavigate();

  //Login Api call
  const UserLogin = async () => {
    try {
      const Data = (
        await axios.post(`${BASE_URL}/api/login`, { Email, Password })
      ).data;
      NotificationMethod(Data.message,Data.status)
      if (Data.token) {
        localStorage.setItem("auth", JSON.stringify(Data));
        // Authentication(Data.token)
        setAuth({
          token: Data.token,
        });
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      NotificationMethod(error.response.data.message,error.response.data.status)
    }
  };

  // const Emailcheck = () => {
  //   // Email Check Syntax is correct or not
  //   if (Email) {
  //     if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i?.test(Email)) {
  //       return "Valid email address";
  //     } else {
  //       return "Invalid email address";
  //     }
  //   }
  // };

  // const PasswordCheck = () => {
  //   // Password Check Syntax is correct or not
  //   if (Password) {
  //     if (
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/?.test(
  //         Password
  //       )
  //     ) {
  //       return "Valid password";
  //     } else return "Invalid password";
  //   }
  // };

  return (
    <>
      <div className="LoginContainer">
        <div className="LoginImageConatiner">
          <img src={image} alt="" />
          {/*<div className="loginImagetext">
            <h2>Samsung</h2>
            <p>Thanks for Comming</p>
  </div>*/}
        </div>
        <div className="LoginFormContainer">
          <div>
            <p className="text-xl">Welcome Back</p>
            <span className="loginInputSpan">
              <FaUser className="text-[#c2c2c2]" />
              <input
                type="text"
                placeholder="abcd@ex.com"
                onChange={(e) => setEmail(e?.target?.value)}
              />
            </span>
            {/* <p className={`${!Email ? "hidden" : ""} text-center`}>
              {Emailcheck()}
            </p> */}
            <span className="loginInputSpan">
              <FaLock className="text-[#c2c2c2]" />
              <input
                type="password"
                placeholder="************"
                onChange={(e) => setPassword(e?.target?.value)}
              />
            </span>
            {/* <p className={`${!Password ? "hidden" : ""} text-center`}>
              {PasswordCheck()}
            </p> */}
            <button onClick={UserLogin}>Login</button>
            <p className="text-center mt-3 text-base cursor-pointer hover:border-b hover:border-b-teal-500 hover:rounded-full  ">
              Forgot Password
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
