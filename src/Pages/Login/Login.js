import React, { useEffect, useState } from "react";
import "./Login.css";
import image from "../../Assets/Login/Login.webp";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const Emailcheck = () => {    // Email Check Syntax is correct or not
    if (email) {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return "Valid email address";
      } else {
        return "Invalid email address";
      }
    }
  };

  const PasswordCheck = () => {    // Password Check Syntax is correct or not
    if (password) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          password
        )
      ) {
        return "Valid password";
      } else return "Invalid password";
    }
  };

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
            <p className={`${!email ? "hidden" : ""} text-center`}>
              {Emailcheck()}
            </p>
            <span className="loginInputSpan">
              <FaLock className="text-[#c2c2c2]" />
              <input
                type="password"
                placeholder="************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <p className={`${!password ? "hidden" : ""} text-center`}>
              {PasswordCheck()}
            </p>
            <button>Login</button>
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
