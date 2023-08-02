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
  const [allModels, setModels] = useState();
  const [allTasks, setAllTasks] = useState([]);
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
    } catch (error) {
      console.log(error);
    }
  };

  const ModelsGet = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/AllModelDisplay`))
        .data;

      if (Response) setModels(Response.AllModels);
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
  };

  const TaskAdd = async (Data) => {
    try {
      const {
        Job_No,
        Model,
        Colour,
        Metal_Code,
        Fab_ID,
        Status_Allocated,
        Message,
        Price,
        Date,
      } = Data;
      const Response = (
        await axios.post(`${BASE_URL}/api/TaskAdd`, {
          Job_No,
          Model,
          Colour,
          Metal_Code,
          Fab_ID,
          Status_Allocated,
          Message,
          Price,
          Date,
        })
      ).data;
      alert(Response.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const AllTaskDisplay = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/TaskDisplay`)).data;
      if (Response) setAllTasks(Response.AllTasks);
      console.log(Response);
      console.log(Response.AllTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const SingleTaskDataGet = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}`)).data;
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isSignedIn) SignedInStatus();
    if (auth.token) Authentication();
    ModelsGet();
    AllTaskDisplay();
  }, [auth]);

  return (
    <AllContext.Provider
      value={{ setAuth, role, isSignedIn, allModels, TaskAdd, allTasks }}
    >
      {children}
    </AllContext.Provider>
  );
};

// const UseController = () => useContext(AllContext);

export { AllContext, AllProvider };
