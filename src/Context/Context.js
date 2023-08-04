import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const AllContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
  });
  const [render, setRender] = useState(false);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SignedInStatus = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;

      if (token) if (!auth.token) setAuth({ token });

      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const NotificationMethod = async (message, status) => {
    if (status) {
      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const ModelsGet = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/AllModelDisplay`))
        .data;

      if (Response) setModels(Response.AllModels);
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
        Status,
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
          Status,
          Message,
          Price,
          Date,
        })
      ).data;

      if (Response) NotificationMethod(Response.message, Response.status);

      setRender(true);
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message);
      NotificationMethod(error.response.data.message, false);
    }
  };

  const AllTaskDisplay = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/TaskDisplay`)).data;
      if (Response) setAllTasks(Response.AllTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRender(false);
    if (isSignedIn) {
      ModelsGet();
      AllTaskDisplay();
    }
    if (auth.token) {
      Authentication();
    }
    SignedInStatus();
  }, [render, auth]);

  return (
    <AllContext.Provider
      value={{
        setAuth,
        role,
        isSignedIn,
        allModels,
        TaskAdd,
        allTasks,
        render,
        setRender,
        NotificationMethod,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

// const UseController = () => useContext(AllContext);

export { AllContext, AllProvider };
