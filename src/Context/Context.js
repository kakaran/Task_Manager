import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AllContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
  });
  const [role, setRole] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const navigate = useNavigate()

  axios.defaults.headers.common["authtok"] = auth.token;

  const Authentication = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/authentication`)).data;
      if (Response) {
        setRole(Response);
      }
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
  };

  const SignedInStatus = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;

      if (token) if (!auth.token) setAuth({ token });

      setIsSignedIn(true);
      // navigate("/dashboard")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isSignedIn) SignedInStatus();
    if (auth.token) Authentication();
  }, [auth]);

  return (
    <AllContext.Provider value={{ setAuth, role, isSignedIn }}>
      {children}
    </AllContext.Provider>
  );
};

// const UseController = () => useContext(AllContext);

export { AllContext, AllProvider };
