import React from "react";
import "./Login.css";
import image from "../../Assets/Login/Login.webp";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
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
            <p>Welcome Back</p>
            <span className="loginInputSpan">
              <FaUser className="text-[#c2c2c2]"/>
              <input type="text" placeholder="abcd@ex.com" />
            </span>
            <span className="loginInputSpan">
              <FaLock className="text-[#c2c2c2]"/>
              <input type="password" placeholder="************" />
            </span>
            <button>Login</button>
            <p>Forgot Password</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
